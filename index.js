const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth', function(err, db) {
  if (err) {
      console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
      console.log('Connected to Server successfully!');
  }
});

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);


// Server Setup
const port = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on:', port);