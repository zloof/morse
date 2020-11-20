const net = require('net');
const morse = require('morse');

const HOST = process.env.HOST || '127.0.0.1'
let PORT = process.env.PORT || 5000
const BRANCH_NAME = process.env.BRANCH_NAME || "undefined"
const TRIGGER_BY_USER = process.env.TRIGGER_BY_USER || true
if(TRIGGER_BY_USER){
	console.log('TRIGGER_BY_USER',String(TRIGGER_BY_USER));
	PORT = 1905
}

const client = new net.Socket();
let morseDataCount = 0
const connectionDuration = 30000

const productionPort = 4000;
const developPort = 5000;

describe('test morse', function() {
    it('morse duration', function(done) {
        client.connect(PORT,HOST , function() {
			console.log('Connected');
			setTimeout(()=> {
				client.end();
			},connectionDuration)
		});

		client.on('data', function(data) {
			console.log('morse: ' + data);
			const clientIP = morse.decode(String(data));
			console.log('clientIP: ' + clientIP);
			morseDataCount++;

		});

		client.on('close', function() {
			console.log('Connection closed');
			console.log('morseDataCount = ',morseDataCount);
			if(morseDataCount == 6 || morseDataCount == 7){
				done();
			}
			else{
				done(`morseDataCount is not equal to 6 or 7 (morseDataCount=${morseDataCount})`);
			}
		});
	}).timeout(35000);

	it('port match branch', function(done) {
		console.log(`PORT ${PORT}, BRANCH_NAME ${BRANCH_NAME}`)
		if(["main","master","release"].indexOf(BRANCH_NAME) != -1){ // production branch
			if(PORT == productionPort){ // check if port match production port
				done();
			}
			else{
				done(`Port need to be equal to ${productionPort} but it's equal to ${PORT}`);
			}
		}
		else if(PORT == developPort){ // check if port match develop port
			done();
		}
		else{
			done(`Port need to be equal to ${developPort} but it's equal to ${PORT}`);
		}
    })
});
