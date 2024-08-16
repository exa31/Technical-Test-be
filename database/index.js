const mongoose = require('mongoose');
const { dbName, dbUser, dbPass, atlasCluster } = require('../app/config');

// Connect to the database
// mongoose.connect('mongodb://localhost:27017/technical-test')
//     .then(() => {
//         console.log('Connected to the database!');
//     })

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}${atlasCluster}/${dbName}?retryWrites=true&w=majority&appName=AtlasCluster`).then(() => {
    console.log('Connected to the database!');
});

const db = mongoose.connection;
module.exports = db;