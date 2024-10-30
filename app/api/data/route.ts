import { NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET() {
  const apiKey = process.env.KOPIS_API_KEY;

  try {
    const response = await fetch(
      `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${apiKey}&stdate=20230601&eddate=20230630&cpage=1&rows=10&prfstate=02&signgucode=11&signgucodesub=1111&kidstate=Y`
    );
    const textData = await response.text();
    const data = await xml2js.parseStringPromise(textData);
    return NextResponse.json(data.dbs.db);
  } catch (error) {
    console.log('Error from Fetching Data: ', error);
  }
}
