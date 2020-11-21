const net = require('net');
const morse = require('morse');

const PORT = process.env.PORT || 5000
const morseInterval = 5000
const morseDuration = 30000

var server = net.createServer(async socket => {
	const remoteAddress = socket.remoteAddress;
	await sendRecurrentMorseCode(socket,remoteAddress,morseInterval,morseDuration);
});

server.listen(PORT , function() {
	console.log('server bound');
});

async function sendRecurrentMorseCode(socket,message,interval,execDuration){
	// run while execDuration ended
	let isConnected = true;
	socket.on('end', () => {
		isConnected = false;
		console.log('client disconnected');
	});
	for (;isConnected;) {
		sendMorseCode(socket,message);
		await sleep(interval) // delayed loop
	}
}

function sendMorseCode(socket,message){
	const encoded = morse.encode(message);
	socket.write(encoded);
	socket.pipe(socket);
}

function sleep(ms) {
	// TODO: need to check why the delay having a milliseconds delta
	return new Promise(resolve => setTimeout(resolve, ms));
}

process.on('uncaughtException', function (err) {
    console.log(err);
});
