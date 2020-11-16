const net = require('net');
const morse = require('morse');

const HOST = process.env.HOST ||  '127.0.0.1'
const port = process.env.PORT || 5000

var client = new net.Socket();
client.connect(port,HOST , function() {
	console.log('Connected');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});
