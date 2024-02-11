const express = require('express');
const app = express();
const path = require('path');
const CategoryRoutes = require('./routes/categorys');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const RouterSignUpIn=require('./routes/user');
const productRouter=require('./routes/product');
const cartRoutes=require('./routes/cart');
const initialinfo=require('./routes/initialinfo');
const page=require('./routes/page');
const admin=require('./routes/admin');
const address=require('./routes/address');
const order=require('./routes/order');

// const sessionConfig=require('./config/sessionConfig')
const cors=require('cors')


dotenv.config({ path: './config.env' }); 
app.use(express.json()); 
app.use(cors())
// Middleware
// app.use(sessionConfig);
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Check if CONN_STR is loaded correctly
if (!process.env.CONN_STR) {
    console.error('CONN_STR is not defined in the environment variables');
    process.exit(1); // Exit the process if the variable is not defined
}
app.use('/public/images', express.static('public/images'));
app.use('/public/pictures', express.static('public/pictures'));
app.use('/public/pics', express.static('public/pics'));

mongoose
    .connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('MongoDB Connection Error:', error);
    });

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is up and running.'
    });
});

  

app.post('/data', (req, res) => {
    res.status(200).json({
        message: req.body
    });
});
// app.use('/public',express.static('C:\\Users\\sai\\Pictures\\Screenshots'))
// app.use(express.static(path.join(__dirname,'uploads')));
app.use('/api', CategoryRoutes);
app.use('/api',page);
app.use('/api',admin);
app.use('/api', RouterSignUpIn);
app.use('/api',productRouter);
app.use('/api',cartRoutes);
app.use('/api',initialinfo);
app.use('/api',order);

app.use('/api',address);



app.listen(3001, () => {
    console.log('Server is running on port 3001.');
});
