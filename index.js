const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000

// DataBase Connection
const dbConnection = require('./config/dbConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//  authRoute
const authRoute = require('./routes/authRoutes/authRoute');
app.use('/auth',authRoute);

//  adminRoute
const adminRoute = require('./routes/adminRoutes/adminRoute');
app.use('/admin',adminRoute);

// ========== Common Routes ==========

//  CategoryRoutes
const categoryRoute = require('./routes/commonRoutes/categoryRoutes');
app.use('/common/category',categoryRoute);

//  PostRoutes
const postRoute = require('./routes/commonRoutes/postRoutes');
app.use('/common/post', postRoute);

//  UserRoutes 
const userRoute = require('./routes/commonRoutes/userRoutes');
app.use('/common/user',userRoute)

//  likeRoutes
const likeUnlikeRoute = require('./routes/commonRoutes/likeAndUnlikeRoutes');
app.use('/common/like',likeUnlikeRoute);

// port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})