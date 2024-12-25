import axios from 'axios';

const apiDomain = 'http://localhost:3308/api';
// 회원가입(post) 앤드포인트
export async function addUser(userData: any) {
  try {
    const result = await axios.post(`${apiDomain}/user/signup`, userData);
    console.log(result.data.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 로그인 앤드 포인트
export async function loginUser(loginData: any) {
  // 쿠키 요청
  try {
    const data = await axios.post(`${apiDomain}/user/login`, loginData, { withCredentials: true });
    const accessToken = data.data.accessToken;
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 토큰 인증 앤드 포인트
export async function verifyToken() {
  try {
    const result = await axios.get(`${apiDomain}/feature/verify`, { withCredentials: true });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
