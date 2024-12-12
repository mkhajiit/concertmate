import axios from 'axios';

// 회원가입(post) 앤드포인트
export async function addUser(userData: any) {
  try {
    const result = await axios.post('http://localhost:3308/api/signup', userData);
    console.log(result.data.message);
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
