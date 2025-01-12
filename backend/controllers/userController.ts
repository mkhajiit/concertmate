import { addUserModel, loginUserModel } from '../models/userModel';
import idModule from '../../shared/lib/id_module';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import createAccessToken from '../lib/createAccessToken';

dotenv.config();
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
// req, res 타입 추후에 바꿀것
// 회원가입
export const addUserController = async (req: any, res: any) => {
  const { email, password, nickname } = req.body;
  const id = idModule(8);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await addUserModel(id, email, hashedPassword, nickname);
    console.log('회원가입성공');
    return res.status(201).json({ message: '회원가입이 성공했습니다' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: '에러가 발생했습니다' });
  }
};

// 로그인
// Express의 핸들러 함수는 일반적으로 반환값을 기대하지 않습니다.
export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await loginUserModel(email);
    if (!result) {
      console.log('존재하지 않는 아이디입니다.');
      res.status(404).json({ message: 'User not found' });
      return;
    }
    console.log('존재하는 아이디입니다', result);

    const isPasswordValid = await bcrypt.compare(password, result.password_hash);
    if (!isPasswordValid) {
      console.log('잘못된 비밀번호 입니다');
      res.status(401).json({ message: 'Invalid Password' });
      return;
    }
    console.log('존재하는 비밀번호입니다');

    // 키가 없을때 처리를 해줘야 에러가 발생 안한다.(타입스크립트)
    if (!refreshTokenKey) {
      throw new Error('환경변수에 알맞은 변수가 없습니다.');
    }

    const accessToken = createAccessToken(result.user_id);
    const refreshToken = jwt.sign({ id: result.user_id }, refreshTokenKey, { expiresIn: '14d' });
    console.log('엑세스토큰: ', accessToken, '리프래쉬 토큰: ', refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // JavaScript로 쿠키 접근 불가
      secure: false, // HTTPS에서만 전송 (로컬 개발 시 false로 설정)
      sameSite: 'strict', // CSRF 방어
      maxAge: 3600 * 1000, // 1시간
    });

    res.status(200).json({ message: '로그인 성공', accessToken });
    return; // 명시적으로 흐름 종료 시키기위해 return ; 추가
  } catch (error) {
    res.status(500).json({ message: '서버에러 발생' });
    return;
  }
};
