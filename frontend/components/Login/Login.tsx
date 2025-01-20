'use client';

import { saveAccessToken } from '@/lib/tokenFunc/tokenFunc';
import { loginUser } from '../../api/api';
import { useAuthStateStore } from '@/zustand/AuthStateStore';
import VerifyUser from '../VerifyUser/VerifyUser';

interface ILoginSubmitData {
  email: string;
  password: string;
}

function Login() {
  const { isAuthenticated, setAuthenticateState } = useAuthStateStore();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: ILoginSubmitData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const token = await loginUser(data);

      saveAccessToken(token);
      setAuthenticateState(true);
    } catch (error) {
      console.error('통신실패: ', error);
      setAuthenticateState(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor='email'>이메일</label>
          <input type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' name='password' required />
        </p>
        <button type='submit'>로그인</button>
      </form>
    </div>
  );
}

function ProtectedLoginPage() {
  return (
    <VerifyUser>
      <Login />
    </VerifyUser>
  );
}

export default ProtectedLoginPage;
