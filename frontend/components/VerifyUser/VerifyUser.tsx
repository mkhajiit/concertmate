// 비동기 방식을 처리하기 위해서 클라이언트 사이드에서 처리합니다
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/api/api';
import Loading from '../Loading/Loading';
import { useAuthStateStore } from '@/zustand/AuthStateStore';

interface VerifyUserProps {
  children: React.ReactNode;
  shouldRedirect?: boolean; // 리다이렉트 여부를 설정하는 옵션
}

function VerifyUser({ children, shouldRedirect }: VerifyUserProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리합니다.
  const { isAuthenticated, setAuthenticateState } = useAuthStateStore();

  useEffect(() => {
    async function checkAuth() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const result = await verifyToken(accessToken); // 인증 확인
        console.log(result);
        if (result.status !== 200) {
          setAuthenticateState(false);
          if (shouldRedirect) {
            router.push('/auth/login'); // 인증 실패 시 로그인 페이지로 리다이렉트
          }
        } else {
          setAuthenticateState(true); // 인증 성공 시 인증 상태 변경
        }
      } catch (error) {
        router.push('/auth/login'); // 예외 발생 시 로그인 페이지로 리다이렉트
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    }

    checkAuth();
  }, [router]); // router가 변경될 때마다 실행

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    ); // 로딩 중에는 로딩 화면을 보여줍니다.
  }

  return <>{children}</>;
}

export default VerifyUser;
