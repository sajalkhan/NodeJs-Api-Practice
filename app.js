const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();
const port = 8080;

app.use(express.json()); // include this middleware to put body data
app.use(morgan('dev'));

app.use((req,res,next)=>{      // all of our middleware will be include our mounted all routes
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter); // mount those route and it's always set bottom all of the route module
app.use('/api/v1/user', userRouter);

app.listen(port, ()=>{
    console.log(`App running on port ${port}..`);
});
