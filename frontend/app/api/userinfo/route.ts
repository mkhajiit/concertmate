import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/db/db';
import idModule from '../../../../shared/lib/id_module';

//회원가입 post 요청
export async function POST(request: Request) {
  try {
    const { email, password, nickname }: { email: string; password: string; nickname: string } =
      await request.json();
    const id = idModule(8); // id생성모듈을 사용해서 난수 생성
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users(user_id,email,password_hash,nickname) VALUES(?,?,?,?)', [
      id,
      email,
      hashedPassword,
      nickname,
    ]);
    return NextResponse.json({ message: 'Added!' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
