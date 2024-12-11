const express = require('express');
const cors = require('cors');

const app = express();
const port = 3308;

app.use(cors()); // CORS 문제 해결
// JSON 데이터 파싱 미들웨어 추가
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
