import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';

// const options = {
//   origin: 'http://localhost:3000',
//   userSuccessStatus: 200,
// }

// aap init
const app = express();

// User cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());


// router
readdirSync('./routes').map(async r => {
  const { default: router } = await import(`./routes/${r}`);
  app.use(`/${r.split('.')[0]}`, router);
});

// DB Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dbName: 'facebook'
}).then(() => console.log('DB connected...'))
.catch(() => console.error('DB not connected...'));

app.get('/', (req, res) => {
  res.send('Welcome in hell');
})

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
})