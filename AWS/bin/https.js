var fs = require('fs'),
const http = require('http'),
const https = require('https'),
const app = require('../app')

var port = 8000;

var options = {
    key: fs.readFileSync('../ssl/rukunkey.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem'),
}

https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});
