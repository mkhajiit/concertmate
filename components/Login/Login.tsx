'use client';
import React from 'react';

interface ILoginSubmitData {
  email: string;
  password: string;
}

function Login() {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: ILoginSubmitData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    console.log(data);
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

export default Login;
