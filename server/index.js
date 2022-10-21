const express = require('express');
const routes = require('./routes');
const promMid = require('express-prometheus-middleware');
const auth = require('./auth');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(auth);
app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});