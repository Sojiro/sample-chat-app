const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const serverless = require('serverless-http');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

// app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// http.listen(3000, function () {
//     console.log('listening on *:3000');
// });

module.exports = app;
module.exports.handler = serverless(app);