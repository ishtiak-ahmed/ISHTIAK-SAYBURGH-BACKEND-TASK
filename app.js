const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')
require("dotenv").config();


const app = express();
// Useing middle Ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);



const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xzynl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3042;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/View/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/View/login.html'));
})

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connected succesfully')
}).catch(err => console.log("Error : ", err))

app.listen(PORT, console.log('Server is running.'))