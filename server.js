const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/notes', require('./routes/note'));

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
