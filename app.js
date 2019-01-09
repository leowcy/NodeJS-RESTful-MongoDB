//import Required Modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import two self created modules
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Connect to Mongo Cloud DB
mongoose.connect(
    'mongodb+srv://leo:' + 
    process.env.MONGO_ATLAS_PW + 
    '@restfulapi-gha1v.mongodb.net/test?retryWrites=true', 
    {
       useNewUrlParser: true 
    }
);

//In case of deprecationWarning
mongoose.Promise = global.Promise;

//show Logs of operations
app.use(morgan('dev'));

//Use BodyParser Package
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Access-Control method
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept. Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({
            
        });
    }
    next();
});

//Calling some JS file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Error message reported
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Error 500 specification
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;