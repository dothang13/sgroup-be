"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Đổi cổng từ 5000 sang 3000

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
