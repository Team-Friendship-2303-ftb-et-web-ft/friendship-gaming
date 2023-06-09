require('dotenv').config();
const express = require('express');
const path = require('path');
const client = require('./db/client');
const cors = require('cors');

client.connect();
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client', 'dist')));


app.use('/api', require('./api'));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client', 'dist'))
});

app.use((req, res, next) => {
  try {
    res.status(404).send("Sorry, can't find that! :/");
  } catch (error) {
    console.errror(error);
    throw error;
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = { app };
