const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

//gets a query but does not return objects 

// Todo.remove({}).then((result) => {
// 	console.log(result);
// }).catch(error => {
// 	console.log(error);
// });

//find by query and will return the object 
//Todo.findOneAndRemove()

//find by id and return the object 
//Todo.findByIdAndRemove()
Todo.findById('abcdef').then(todo => {
	console.log(todo);
})