//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// first argument: string - url
// second argument: callbck
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.error('unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//deleteMany 
	// db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
	// 	console.log(result);
	// });

	//deleteOne
	// db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
	// 	console.log(result);
	// });
	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
	// 	//in lastErrorObject.n c'è il numero di record cancellati 
	// 	console.log(result);
	// });

	// db.collection('Users').deleteMany({ name: 'Michele' }).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndDelete({ _id: new ObjectID('58ea997b1c2cb90997e2892d') }).then((result) => {
		//in lastErrorObject.n c'è il numero di record cancellati 
		console.log(result);
	});

	//db.close();
});
