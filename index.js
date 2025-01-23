const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000

const dbConnection = require('./config/dbConnection');
const authRoute = require('./Auth/routes/authRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/',authRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})