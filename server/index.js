const { app } = require('./app');
require('dotenv').config();

const port = 8080;

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
