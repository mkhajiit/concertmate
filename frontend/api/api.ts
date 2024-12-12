import axios from 'axios';

const apiDomain = 'http://localhost:3308/api';
// 회원가입(post) 앤드포인트
export async function addUser(userData: any) {
  try {
    const result = await axios.post(`${apiDomain}/signup`, userData);
    console.log(result.data.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUser(loginData: any) {
  // 쿠키 요청
  try {
    await axios.post(`${apiDomain}/login`, loginData, { withCredentials: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
