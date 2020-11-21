const net = require('net');
const morse = require('morse');

const PORT = process.env.PORT || 5000
const morseInterval = 5000

var server = net.createServer(async socket => {
	const remoteAddress = socket.remoteAddress;
	await sendRecurrentMorseCode(socket,remoteAddress,morseInterval);
});

server.listen(PORT , function() {
	console.log('server bound');
});

async function sendRecurrentMorseCode(socket,message,interval){
	// run while execDuration ended
	const interval = setInterval(() => {
		sendMorseCode(socket,message);
	}, interval);

	let isConnected = true;
	socket.on('end', () => {
		isConnected = false;
		clearInterval(interval);
		console.log('client disconnected');
	});
}

function sendMorseCode(socket,message){
	const encoded = morse.encode(message);
	socket.write(encoded);
	socket.pipe(socket);
}

process.on('uncaughtException', function (err) {
    console.log(err);
});
