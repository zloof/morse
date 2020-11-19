const net = require('net');
const morse = require('morse');

const HOST = process.env.HOST ||  '127.0.0.1'
const port = process.env.PORT || 5000

const client = new net.Socket();
let morseDataCount = 0
const morseDuration = 30000

describe('test morse', function() {
    it('morse duration', function(done) {

        client.connect(port,HOST , function() {
			console.log('Connected');
			setTimeout(()=> {
				client.end();
			},morseDuration)
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
			if(morseDataCount == 8 || morseDataCount == 9){
				done();
			}
			else{
				done(`morseDataCount is not equal to 6 or 7 (morseDataCount=${morseDataCount})`);
			}
		});
    }).timeout(35000);
});

