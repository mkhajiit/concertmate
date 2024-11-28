import axios from 'axios';

// 회원가입(post) 앤드포인트
export async function addUser(userData: any) {
  try {
    await axios.post('/api/userinfo', userData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUser(loginData: any) {
  try {
    await axios.post('/api/login', loginData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
