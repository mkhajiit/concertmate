import { addUserModel, loginUserModel } from '../models/userModel';
import idModule from '../../shared/lib/id_module';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;
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
export const loginUserController = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserModel(email);
    if (!result) {
      console.log('존재하지 않는 아이디입니다.');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('존재하는 아이디입니다', result);

    const isPasswordValid = await bcrypt.compare(password, result.password_hash);
    if (!isPasswordValid) {
      console.log('잘못된 비밀번호 입니다');
      return res.status(401).json({ message: 'Invalid Password' });
    }
    console.log('존재하는 비밀번호입니다');

    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined in the environment variables.');
    }

    const token = jwt.sign({ id: result.id }, secretKey, { expiresIn: '1h' });

    res.cookie('authToken', token, {
      httpOnly: true, // JavaScript로 쿠키 접근 불가
      secure: false, // HTTPS에서만 전송 (로컬 개발 시 false로 설정)
      sameSite: 'strict', // CSRF 방어
      maxAge: 3600 * 1000, // 1시간
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
