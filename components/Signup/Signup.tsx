import React from 'react';
function SignUp() {
  return (
    <div>
      <h1>회원가입</h1>
      <form>
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
          <input type='check_password' name='check_password' required />
        </p>
        <p>
          <label htmlFor='nickname'>닉네임</label>
          <input type='nickname' name='nickname' required />
        </p>
        <button type='submit'>제출</button>
      </form>
    </div>
  );
}

export default SignUp;
