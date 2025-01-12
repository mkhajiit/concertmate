import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import createAccessToken from '../lib/createAccessToken';

dotenv.config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

// 리프래시 토큰과 엑세스 토큰 모두 검사함
export async function verifyTokenController(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;

    // 환경변수에 키가 지정되어있지 않은 경우
    if (!accessTokenKey || !refreshTokenKey) {
      throw new Error('환경변수에 알맞은 변수가 없습니다');
    }

    // 로그인 하지 않은 경우
    if (!accessToken || !refreshToken) {
      res.status(401).json({ message: '토큰이 없습니다. 인증이 필요합니다.' });
      return;
    }

    // 리프래시 토큰이 만료되면 로그인 하도록 유도하기위해 리프래시 토큰 만료를 먼저 검사함
    jwt.verify(
      refreshToken,
      refreshTokenKey,
      (err: Error | null, decoded: JwtPayload | string | undefined) => {
        if (err || typeof decoded === 'string' || !decoded) {
          res.status(403).json({ message: '리프래시 토큰이 만료되었습니다 재로그인 해주세요' });
          return;
        }

        // 리프래시 토큰에 저장된 페이로드
        const userId = decoded?.id;

        // 엑세스 토큰이 만료 되었으면 재발급하고 만료되지 않았으면 유효인증
        jwt.verify(accessToken, accessTokenKey, (err) => {
          if (err) {
            const accessToken = createAccessToken(userId);

            // 새로운 엑세스 토큰을 클라이언트에 응답으로 전송
            res.status(200).json({
              message: '엑세스 토큰 갱신 완료',
              accessToken, // 새 엑세스 토큰
            });
            return;
          }

          res.status(200).json({ message: '엑세스 토큰이 유효합니다' });
        });
      }
    );
  } catch (error) {
    console.log(error);
    // 예외가 발생했을 경우 500 오류로 응답
    res.status(500).json({ message: 'Server error' });
    return;
  }
}
