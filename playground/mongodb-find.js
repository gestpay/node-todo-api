//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// first argument: string - url
// second argument: callbck
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.error('unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos')
	// 	.find({
	// 		_id: new ObjectID('58ea997b1c2cb90997e2892c')
	// 	})
	// 	.toArray()
	// 	.then((docs) => {
	// 		console.log('Todos');
	// 		console.log(JSON.stringify(docs, undefined, 2));
	// 	}, (err) => {
	// 		console.log('Unable to fetch todos', err);
	// 	});

	db.collection('Users')
		.find({ name: 'Michele' })
		.toArray()
		.then((docs) => {
			console.log('Users');
			console.log(JSON.stringify(docs, undefined, 2));
		}, (err) => {
			console.log('Unable to fetch todos', err);
		});


	//db.close();
});
