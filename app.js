const express = require('express');
const app = express();
const morgan = require('morgan'); // morgan calls the next() , to inform that it logged and the middleware cycle should continue
const bodyParser = require('body-parser');
const helmet = require('helmet');
var MongoClient = require('mongoose');
var passport = require('passport');



const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const rateLimit = require('./api/middleware/security/ratelimit');

//Helmet Protection
app.use(helmet.noCache());
app.use(helmet({
    frameguard: {
      action: 'deny' //allow if your app is <frame> || <object>
    }
}));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

//static files use
app.use('/uploads' , express.static('uploads')); // file uploads is public static , with the /uploads path , it knows which paths it runs

//Rate Limiter with Redis and express-rate-limit
app.use(rateLimit.limiter);


//Passport - can be used as middleware with : passport.authenticate('jwt', { session: false }) but for now we use jsonwebtoken package with check-auth.js
// app.use(passport.initialize());

//MongoDB Set Up
var uri = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_URL}?retryWrites=false`;

MongoClient.connect(uri, function(err, client) {

});

MongoClient.Promise = global.Promise;//we can use bluebird etc..


//Every request that is getting build , adds that to the header;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');// * = allow every origin to has access.otherwise -->
    // res.header('Access-Control-Allow-Origin', 'https://my-rest-api.com/api');//To only allow a specific path

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');//Allow these headers
    
    //When browser posts or puts , sends first an OPTIONS request to check if he is allowed
    if ( req.method === 'OPTIONS' ){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); //empty json to provide the headers answer
    }

    next();
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

//Error creator for the routes result
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404; // we can test the handle with a custom mistake error.status(404) , and it will create a custom message
    next(error); //forward the error 
});

//Handle each error at a time
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
