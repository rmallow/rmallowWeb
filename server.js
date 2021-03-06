console.log('Server-side code running');

const express = require('express');
const app = express();
var path = require('path')

// serve files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

// start the express web server listening on 8080 
app.listen(3000, () => {
  console.log('listening on 3000');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

