const { Pool, Client } = require('pg');

// Getting db from environment
require('dotenv').config();

//Connection to Elephant SQL db
const pool = new Client(process.env.PG_ELEPHANT_URL);

pool
  .connect()
  .then(() => {
    console.log('👉We have Connected DB Successfully😀😀');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
