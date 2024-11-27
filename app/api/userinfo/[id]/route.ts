import pool from '@/db/db';
import { NextResponse } from 'next/server';

//get 요청
export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const [results] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return NextResponse.json({ message: 'GET TEST Complete!!!' });
  } catch (error) {
    console.log(error);
  }
}
