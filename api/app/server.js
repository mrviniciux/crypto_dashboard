require('dotenv').config();
import app from './app.js';
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app running on port ${port} frontend host is ${process.env.FRONTEND_HOST}. Changes avaiable on .env`);
});