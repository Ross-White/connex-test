const express = require('express');
const routes = require('./routes');
const auth = require('./auth');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(auth);
app.use(routes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});