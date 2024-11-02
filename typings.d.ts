// TypeScript 에서 css module 사용하기 위해 필요한 코드
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
