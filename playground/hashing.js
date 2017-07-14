const { SHA256 } = require('crypto-js')

let message = 'I am user number 3';

var hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log(`hash: ${hash}`);

let data = {
	id: 4
}

let token = {
	data: data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}
let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
	console.log('data was not changed');
} else {
	console.log('data was changed. Dont\' trust');
}
