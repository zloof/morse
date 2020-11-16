const net = require('net');
const morse = require('morse');

const port = process.env.PORT || 5000
const morseInterval = 5000
const morseDuration = 30000

var server = net.createServer(async socket => {
	const remoteAddress = socket.remoteAddress;
	await sendRecurentMorseCode(socket,remoteAddress,morseInterval,morseDuration);
	socket.end(); // close the connection
});

server.listen(port , function() {
	console.log('server bound');
});

async function sendRecurentMorseCode(socket,message,interval,execDuration){
	// run while execDuration ended
	for (let startTime = new Date().getTime(); new Date().getTime() + interval < startTime + execDuration;) {
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
