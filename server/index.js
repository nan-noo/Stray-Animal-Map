const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const userRouter = require('./routes/users');

const port = 5000;
const app = express();

app.use(cors()); // to avoid CORS error
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

mongoose.connect( config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch( err => console.log(err));

//router
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`))