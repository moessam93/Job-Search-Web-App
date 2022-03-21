const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB;
