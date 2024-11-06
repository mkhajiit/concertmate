// fetch함수 있는 파일
import { NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET() {
  const apiKey = process.env.KOPIS_API_KEY;

  try {
    const response = await fetch(
      `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${apiKey}&stdate=20241006&eddate=20241230&cpage=1&rows=10&shcate=DDDD`
    );
    const textData = await response.text();
    const data = await xml2js.parseStringPromise(textData);
    const dbData = data?.dbs?.db || []; // 데이터가 없으면 빈 배열을 반환
    return NextResponse.json(dbData);
  } catch (error) {
    console.log('Error from Fetching Data: ', error);
  }
}
