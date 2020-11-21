const net = require('net');
const morse = require('morse');

const PORT = process.env.PORT || 5000
const morseInterval = 5000

var server = net.createServer(async socket => {
	const remoteAddress = socket.remoteAddress;
	// send morse code when connection established
	sendMorseCode(socket,remoteAddress);
	// send morse code every morseInterval as long the connection is open
	const interval = setInterval(() => {
		sendMorseCode(socket,remoteAddress);
	}, morseInterval);

	socket.on('end', () => {
		clearInterval(interval);
		console.log('client disconnected');
	});
});

server.listen(PORT , function() {
	console.log('server bound');
});

function sendMorseCode(socket,message){
	const encoded = morse.encode(message);
	socket.write(encoded);
	socket.pipe(socket);
}

process.on('uncaughtException', function (err) {
    console.log(err);
});
