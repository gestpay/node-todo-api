const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user')

const {todos, populateTodos, users, populateUsers } = require('./seed/seed')

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('should create a new todo', (done) => {

		let text = 'Test todo text';
		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch(e => done(e))
			});

	});

	it('should not create todo with invalid body data', done => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch(e => done(e));
			});
	});
});

describe('GET /users/me', () => {
	it ('should return user if authenticated', (done) => {
		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res) => {
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);
		})
		.end(done);
	})

	it('should return 401 if not authenticated', (done) => {
		request(app)
		.get('/users/me')
		//.set('x-auth', users[0].tokens[0].token)
		.expect(401)
		.expect((res) => {
			expect(res.body).toEqual({});
		})
		.end(done);
	})
})

describe('POST /users', () => {
	it('should create a user', (done) => {
		let email = 'example@example.com';
		let password = '123mnb!'
		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res) => {
			expect(res.headers['x-auth']).toExist(); 
			expect(res.body._id).toExist();
			expect(res.body.email).toBe(email);
		})
		.end(err => {
			if (err) return done(err);
			User.findOne({email}).then(user => {
				expect(user).toExist();
				expect(user.password).toNotBe(password);
				done();
			})
		});
	})

	it ('should return validation errors if request invalid', (done) => {
		let email = 'example@example';
		let password = ''
		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);
	})

	it('should not create user if email in use', done => {
		let email = users[0].email
		let password = 'Password123!'
		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);
	})
})