import express from 'express';
import cors from 'cors';
import userRouter from '../routes/userRoute';

const app = express();
const port = 3308;

app.use(cors()); // CORS 문제 해결
// JSON 데이터 파싱 미들웨어 추가
app.use(express.json());
app.use('/api', userRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
