// 데이터베이스 쿼리와 관련된 로직은 모델에서 처리
import db from '../db/db';

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
