const express = require('express');
require('dotenv').config();
const connectDB = require('./database/connect');
const app = express();
connectDB(process.env.MONGO_URI);
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at ${process.env.PORT}`);
})
