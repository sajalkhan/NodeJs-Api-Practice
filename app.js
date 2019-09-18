const fs = require('fs');
const express = require('express');

const app = express();
const port = 8080;

app.use(express.json()); // include this middleware to put body data 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req,res)=>{

    res.status(200).json({
        message: 'success',
        result: tours.length,
        data:{
            tours
        }
    });
});

app.post('/api/v1/tours', (req,res)=>{
    
    // express doesn't put body data to request that's why we need middleware
    // console.log(req.body);

    const newId = tours[tours.length -1].id + 1; // get last id and add +1 
    const newTour = Object.assign({id: newId}, req.body); // object.assign() allows us to create a new object with our existing object

    tours.push(newTour); // add newTour object to tours array
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{

        res.status(201).json({
            message:'success',
            data:{
                tour: newTour
            }

        });
    });
});

app.listen(port, ()=>{
    console.log(`App running on port ${port}..`);
});
