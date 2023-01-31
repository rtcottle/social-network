const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const dayjs = require('dayjs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(dayjs);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Social Network API running on port ${PORT}!`);
  });
});
