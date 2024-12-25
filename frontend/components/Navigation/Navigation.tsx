import Link from 'next/link';
import React from 'react';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/concert'>공연정보</Link>
        </li>
        <li>
          <Link href='/'>커뮤니티</Link>
        </li>
        <li>
          <Link href='/auth/login'>로그인</Link>
        </li>
        <li>
          <Link href='/auth/signup'>회원가입</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
