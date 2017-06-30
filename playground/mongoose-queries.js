const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5956079a65ba6b4fcd2408c5';

// //Torna un array
// Todo.find({
// 	_id: id
// }).then(todos => {
// 	console.log('Todo.find', todos)
// });
//
//
// //Torna un oggetto solo
// Todo.findOne({
// 	_id: id
// }).then(todo => {
// 	console.log('Todo.findOne', todo)
// });

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.findById(id)
// 	.then(todo => {
// 		if (!todo) return console.log('Id not found')
// 		console.log("Todo.findById", todo)
// 	}).catch(e => console.error(e))

User.findById('592542985299030d459ee9bc')
	.then(user => {
		if (!user) return console.log('User not found');
		console.log('User.findById: ', user)
	}).catch(console.error)