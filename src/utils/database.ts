import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const mongoose = require('mongoose')

const DATABASE_URL = process.env.DATABASE_URL

export const connectDatabase = () =>
  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongodb Atlas connected');
    })
    .catch((error: Params) => {
      console.log("Monogdb não conectou!\nError: "+error);
    });