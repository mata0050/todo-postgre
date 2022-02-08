const express = require('express');
const pool = require('./config/db');
const app = express();

// Middleware
app.use(express.json());



app.get('/', (req, res) => {
  res.send('hello')
})

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});