const express = require('express');
const app = express();

app.use(express.json());

const libraryRoutes = require('./routes/libraryRoutes');
app.use(libraryRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});