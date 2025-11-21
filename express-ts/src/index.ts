import express from 'express';

const app = express();
const PORT = process.env.PORT || 4200;

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});