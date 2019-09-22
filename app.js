const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const express = require('express');
const app = express();

app.use(express.json()); // include this middleware to put body data

if(process.env.NODE_ENV === 'development') // we will use morgan or other some condition like this by the help of env variable
{
    app.use(morgan('dev'));
}

app.use((req,res,next)=>{      // all of our middleware will be include our mounted all routes
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter); // mount those route and it's always set bottom all of the route module
app.use('/api/v1/user', userRouter);

module.exports = app;
