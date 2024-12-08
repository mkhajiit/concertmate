import pool from '@/db/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
type UserData = {
  user_id: string;
  password_hash: string;
};
//로그인 POST 요청
export async function POST(request: Request) {
  try {
    const { email, password }: { email: string; password: string } = await request.json();
    //email로 유저 조회
    const [rows] = await pool.query('SELECT user_id, password_hash FROM users WHERE email = ?', [
      email,
    ]);
    const user = rows as UserData[];

    console.log(user[0]);
    const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
    console.log(isPasswordValid); // true면 입력값과 db에 저장된 비밀번호가 같음

    return NextResponse.json({ message: 'Login Complete' }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
