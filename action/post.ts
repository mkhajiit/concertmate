import { addUser } from '@/api/api';

export async function createUser(prevState: void, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const nickname = formData.get('nickname');

  const data = {
    email,
    password,
    nickname,
  };

  addUser(data);
}
