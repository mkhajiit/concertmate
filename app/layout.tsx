export const metadata = {
  title: '콘서트메이트',
  description: '국내, 내한 콘서트에 관한 정보를 확인할 수 있고 커뮤니티에서 소통하는 웹',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
