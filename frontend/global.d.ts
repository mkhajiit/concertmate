// typescript에서 module.css를 사용하기 위한 코드
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
