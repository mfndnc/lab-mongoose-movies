// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
// this line would work as before, but to close the connection we need the export version
// require('./db');
const mongoose = require('./db');

const Celebrity = require('./models/Celebrity');

const initialCelebritiesData = [
  {
    name: 'Tom Hanks',
    occupation: 'Actor',
    catchPhrase: 'Friend to all',
  },
  {
    name: 'George Clooney',
    occupation: 'Actor',
    catchPhrase: 'Maried to Amal',
  },
  {
    name: 'Kate Blanchett',
    occupation: 'Actor',
    catchPhrase: 'Can do it all',
  },
];

Celebrity.insertMany(initialCelebritiesData)
  .then((insertedData) => {
    console.log(`Success! Added ${insertedData.length} to the database`);
    // closing generating error when done using require('./db');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
