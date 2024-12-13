import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const verifyTokenPromise = (token: string): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretKey!,
      (error: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded!);
        }
      }
    );
  });
};

export async function verifyTokenController(req: Request, res: Response): Promise<void> {
  try {
    const token = req.cookies.authToken;
    console.log(token);

    if (!token) {
      // 토큰이 없으면 바로 응답하고 종료
      res.status(403).json({ message: 'Authentication required' });
      console.log('토큰이 존재하지 않습니다');
      return;
    }

    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined in the environment variables.');
    }

    console.log('토큰확인했습니다.');

    const decoded = await verifyTokenPromise(token);

    (req as any).user = decoded;
    console.log((req as any).user);

    res.status(200).json({ message: 'Token is valid', user: decoded });
    return;
  } catch (error) {
    console.log(error);
    // 예외가 발생했을 경우 500 오류로 응답
    res.status(500).json({ message: 'Server error' });
    return;
  }
}
