const express = require('express');
const app = express();
const morgan = require('morgan');
const monogoos = require('mongoose');


const productRouters = require('./api/routes/products');
const orderRouters = require('./api/routes/orders');
const userRouters = require('./api/routes/user');

//middleware

monogoos.connect(`mongodb+srv://sushil:${process.env.MONGO_ATLAS_PW}@cluster0.gmcca.mongodb.net/${process.env.mongoUser}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(morgan('dev'));
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//coros
app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', "*"); //This is used to give access to every host in our browser
    res.header('Access-Control-Allow-Header','Origin','X-Request-with','Content-Type','Accept','Authorization');
    //This is use for giving request to every request from the client.
    if(req.method === 'OPTIONS') {
        //this is used for giving different put get request so that client used it
        res.header('Access-Control-Allow-Header','PUT','GET','POST','DELETE','PATCH');
        return res.status(200).json({})

    }
    next();
})

app.use('/products', productRouters);
app.use('/orders', orderRouters);
app.use('/user', userRouters);
app.use('/uploads', express.static('uploads'))

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

//server
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => console.log(`port is shown in ${PORT}`));
