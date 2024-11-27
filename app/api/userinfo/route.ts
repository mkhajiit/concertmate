import pool from '@/db/db';
import { idModule } from '@/lib/id_module';
import { NextResponse } from 'next/server';

//post 요청
export async function POST(request: Request) {
  try {
    const { email, password, nickname }: { email: string; password: string; nickname: string } =
      await request.json();
    const id = idModule();
    await pool.query('INSERT INTO users(user_id,email,password_hash,nickname) VALUES(?,?,?,?)', [
      id,
      email,
      password,
      nickname,
    ]);
    return NextResponse.json({ message: 'Added!' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
