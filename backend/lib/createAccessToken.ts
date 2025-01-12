// 엑세스 토큰 만드는 함수
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

export default function createAccessToken(id: string) {
  if (!accessTokenKey) {
    throw new Error('환경변수에 알맞은 변수가 없습니다.');
  }
  return jwt.sign({ id: id }, accessTokenKey, { expiresIn: '15m' });
}
