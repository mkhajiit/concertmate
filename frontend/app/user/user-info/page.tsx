import VerifyUser from '@/components/VerifyUser/VerifyUser';

function UserInfoPage() {
  return (
    <div>
      <h1>유저 정보 페이지</h1>
    </div>
  );
}

function ProtectedPage() {
  return (
    <VerifyUser>
      <UserInfoPage />
    </VerifyUser>
  );
}

export default ProtectedPage;
