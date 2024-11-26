// db id에 저장할 id 생성기
export function idModule() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const length = 8; // 난수는 8~10자리가 좋음
  const random = Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
  const id = `${year}${month.toString().padStart(2, '0')}${day
    .toString()
    .padStart(2, '0')}${random}`; // padStart(2,'0') 문자열의 길이가 2가 될때까지 앞을 0으로 채운다
  console.log(id);
}