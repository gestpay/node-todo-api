const mongoose = require('mongoose');

//define which Promise type to use - the ES6 one 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// let newTodo = new Todo({
// 	text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
// 	console.log("Saved todo", doc);
// }, (err) => {
// 	console.log('Unable to save Todo');
// });

let otherTodo = new Todo({
	text: '    Edit This video   '
});

otherTodo.save().then((doc) => {
	console.log("Saved todo", JSON.stringify(doc, null, 2));
}, (err) => {
	console.log('Unable to save Todo', err);
});

// User model 
// email - require - trim - type - min length of 1 

let User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

let myUser = new User({
	email: '  pippo.baudo@rai.it  '
})

myUser.save().then((doc) => {
	console.log("Saved user", JSON.stringify(doc, null, 2));
}, (err) => {
	console.log('Unable to save User', err);
});