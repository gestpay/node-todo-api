//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// first argument: string - url
// second argument: callbck
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.error('unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("59005f321822ea5a9aaf78db")
	// }, {
	// 		$set: {
	// 			completed: true
	// 		}
	// 	}, {
	// 		returnOriginal: false
	// 	}).then((result) => {
	// 		console.log(result);
	// 	});

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('58ef33cbbdff75060869f436')
	}, {
			$inc: {
				age: 1
			}
		}, {
			returnOriginal: false
		}).then((result) => {
			console.log(result);
		});

	//db.close();
});
