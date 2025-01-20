'use client';
import Link from 'next/link';
import React from 'react';
import { useAuthStateStore } from '@/zustand/AuthStateStore';

function Navigation() {
  const isAuthenticated = useAuthStateStore((state) => state.isAuthenticated);
  return (
    <nav>
      <ul>
        <li>
          <Link href='/concert'>공연정보</Link>
        </li>
        <li>
          <Link href='/'>커뮤니티</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link href='/auth/login'>로그인</Link>
            </li>
            <li>
              <Link href='/auth/signup'>회원가입</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/user/user-info'>회원정보</Link>
            </li>
            <li>
              <button>로그아웃</button>
            </li>
          </>
        )}
        <li>
          <b>{`로그인상태: ${String(isAuthenticated)}`}</b>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
