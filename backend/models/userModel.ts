// 데이터베이스 쿼리와 관련된 로직은 모델에서 처리
import { RowDataPacket } from 'mysql2';
import db from '../db/db';

// MySQL2의 기본 타입인 RowDataPacket을 확장
interface IUserResult extends RowDataPacket {
  id: string;
  email: string;
  password_hash: string;
  nickname: string;
  created_at_time: string;
}

export const addUserModel = async (
  id: string,
  email: string,
  hashedPassword: string,
  nickname: string
) => {
  const [results] = await db.query(
    'INSERT INTO users(user_id,email,password_hash,nickname) VALUES(?,?,?,?)',
    [id, email, hashedPassword, nickname]
  );
  return results;
};

export const loginUserModel = async (email: string) => {
  const [results] = await db.query<IUserResult[]>('SELECT * FROM users WHERE email = ?', [email]);
  const result = results[0];
  return result;
};
