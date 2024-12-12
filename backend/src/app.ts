import express from 'express';
import cors from 'cors';
import userRouter from '../routes/userRoute';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3308;
app.use(
  cors({
    origin: 'http://localhost:3000', // 프론트엔드 URL
    credentials: true, // 쿠키 포함 허용
  })
); // CORS 문제 해결
app.use(cookieParser());
// JSON 데이터 파싱 미들웨어 추가
app.use(express.json());
app.use('/api', userRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
