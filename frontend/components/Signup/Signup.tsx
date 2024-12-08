'use client';

import { useForm } from 'react-hook-form';
import { addUser } from '../../api/api';

export interface IInput {
  email: string;
  password: string;
  check_password: string;
  nickname: string;
}
// 주의!! react-hook-form 도 client 사이드에서만 사용가능함
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>();

  const onSubmit = (data: IInput) => {
    console.log(data);
    addUser(data);
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            id='email'
            {...register('email', { required: '이메일을 입력해주세요' })}
          />
        </p>
        <p>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            {...register('password', { required: '비밀번호를 입력해주세요' })}
          />
        </p>
        <p>
          <label htmlFor='check_password'>비밀번호확인</label>
          <input
            type='password'
            id='check_password'
            {...register('check_password', { required: '비밀번호를 한번 더 입력해주세요' })}
          />
        </p>
        <p>
          <label htmlFor='nickname'>닉네임</label>
          <input
            type='nickname'
            id='nickname'
            {...register('nickname', { required: '닉네임을 입력해주세요!' })}
          />
          {errors.nickname && <span>{errors.nickname.message}</span>}
        </p>

        <button type='submit'>제출</button>
      </form>
    </div>
  );
}

export default SignUp;
