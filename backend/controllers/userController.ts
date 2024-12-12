import { addUserModel } from '../models/userModel';
import idModule from '../../shared/lib/id_module';
import bcrypt from 'bcryptjs';

// req, res 타입 추후에 바꿀것
export const addUserController = async (req: any, res: any) => {
  const { email, password, nickname } = req.body;
  const id = idModule(8);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const results = await addUserModel(id, email, hashedPassword, nickname);
    console.log('회원가입성공');
    return res.status(201).json({ message: '회원가입이 성공했습니다' });
  } catch (error) {
    console.log(error);
    console.log('에러발생');
    return res.status(500).json({ message: '에러가 발생했습니다' });
  }
};
