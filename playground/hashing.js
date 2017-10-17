const { SHA256 } = require('crypto-js')
const bcrypt = require('bcryptjs')

let password = '123abc!'
// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash)
// 	})
// })

let hashedPassword = '$2a$10$ak2m3O1rLzmXTrU0Lv7uJ..76JjARxPX8xL1XFJGL3UhR2u3Q5cpC';

bcrypt.compare('password', hashedPassword, (err, res) => {
	console.log(res);
})

// let message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// let data = {
// 	id: 4
// }

// let token = {
// 	data: data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('data was not changed');
// } else {
// 	console.log('data was changed. Dont\' trust');
// }
