import MainHeader from '@/components/MainHeader/MainHeader';
import VerifyUser from '@/components/VerifyUser/VerifyUser';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <VerifyUser shouldRedirect={true}>{children}</VerifyUser>
    </div>
  );
}
