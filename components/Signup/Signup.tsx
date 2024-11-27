'use client';
import { createUser } from '@/action/post';
import { idModule } from '@/lib/id_module';
import React, { useActionState } from 'react';

function SignUp() {
  // useFormState는 초기값을 void를 요구한다 따라서 undefined가 되어야함
  const [state, formAction] = useActionState(createUser, undefined);
  return (
    <div>
      <h1>회원가입</h1>
      <form action={formAction}>
        <p>
          <label htmlFor='email'>이메일</label>
          <input type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' name='password' required />
        </p>
        <p>
          <label htmlFor='check_password'>비밀번호확인</label>
          <input type='password' name='check_password' required />
        </p>
        <p>
          <label htmlFor='nickname'>닉네임</label>
          <input type='nickname' name='nickname' required />
        </p>
        <button>제출</button>
      </form>
    </div>
  );
}

export default SignUp;
