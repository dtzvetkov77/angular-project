const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectionString = 'mongodb://localhost:27017/good-food';

exports.initializeDatabase = ()=> mongoose.connect(connectionString);