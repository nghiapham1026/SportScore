const express = require('express');

const app = express();

const parseServerRoutes = require('./routes/parse');

app.use('/', parseServerRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running`);
  });