import axios from 'axios';

export async function addUser(data: any) {
  try {
    await axios.post('/api/userinfo', data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
