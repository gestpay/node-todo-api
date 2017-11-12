const express = require('express');
const bodyParser = require('body-parser');

const {
	mongoose
} = require('./db/mongoose');
const {
	Todo
} = require('./models/todo');
const {
	User
} = require('./models/user');
const {
	ObjectID
} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

const {
	authenticate
} = require('./middleware/authenticate')

let app = express();

//handle json in body of requests 
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	console.log(req.body);
	var todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find()
		.then((todos) => {
			res.send({
				todos
			})
		}, (e) => {
			res.status(400).send(e);
		});
});


// GET /todos/123456
app.get('/todos/:id', (req, res) => {
	console.log("GET /todos/:id ...")
	let id = req.params.id;

	//Validate id using isValid
	//404 - send back empty send
	if (!ObjectID.isValid(id)) return res.status(404).send();

	//findById
	Todo.findById(id).then(todo => {
			// success
			// if todo - send it back
			// if no todo - send back 404 with empty body
			if (!todo) return res.status(404).send();

			res.send(todo);
		})
		//error
		//400 - and send empty body back
		.catch(e => res.status(400).send())

})

app.delete('/todos/:id'), (req, res) => {
	//get the id 
	let id = req.params.id;
	//validte the id --> ot valid? return 404 
	if (!ObjectID.isValid(id)) return res.status(404).send();

	//remove todo by id 
	Todo.findByIdAndRemove(id).then(todo => {
		//success
		//if no doc send 404 
		//if doc, send back 
		if (!todo) return res.status(404).send();

		return res.send(todo);
	}).catch(err => {
		//error 
		//400 empty body 
		return res.status(400).send();
	});

}

app.post('/users', (req, res) => {
	//take only these values from the req body 
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then(token => {
		res.header('x-auth', token);
		res.send(user);
	}).catch(e => {
		res.status(400).send(e)
	})
});


// POST /users/login 
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password)
		.then(user => {
			user.generateAuthToken().then(token => {
				res.header('x-auth', token).send(user);
			});
		}).catch(e => {
			res.status(400).send(); 
		});
});

//private route
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
})

app.listen(3000, () => {
	console.log('Starting on port 3000');
});

module.exports.app = app;