//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj);

// first argument: string - url
// second argument: callbck
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.error('unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insert({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.error('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //Insert new doc into Users [name, age, location]
  db.collection('Users').insert({
    name: 'Michele',
    age: 32,
    location: 'Salerno, Italy'
  }, (err, result) => {
    if (err) {
      return console.error('Unable to insert user', err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});
