import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;

let cache: any;

export const connectDatabase = () => {
  if (cache) {
    console.log('Using existing database connection');
    return Promise.resolve();
  }

  console.log('Using new database connection');
  return mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db: any) => [cache = db.connections[0].readyState, console.log('Mongodb Atlas connected')])
    .catch((error: Params) => {
      console.log('Monogdb não conectou!\nError: ' + error);
    });
};
