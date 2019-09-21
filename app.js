const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 8080;

app.use(express.json()); // include this middleware to put body data 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.use(morgan('dev'));

app.use((req,res,next)=>{

    console.log('Hello from middleware');
    next();
});

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

//read all object data
const readAllObject = (req,res)=>{

    res.status(200).json({
        message: 'success',
        requestTime: req.requestTime,
        result: tours.length,
        data:{
            tours
        }
    });
}

//read specific data
const readSingleObject = (req, res) => {  // responding to url parameters

    //console.log(req.params); // req.params are store all the variable store inside the url

    const id = req.params.id * 1; // convert string to number & javascript will convert it when we multipy it by a number;
    const tour = tours.find(el => el.id === id); // javascrit find that specific element from an array
    
    // if(id>tours.length)
    if(!tour)
    {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Id!'
        });
    } 

    res.status(200).json({
        message: 'success',
        data: {
            tours: tour
        }
    });
}

//create data
const createObject = (req,res)=>{
    
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
}

//update data
const updateObject = (req,res)=>{

    if(req.params.id * 1 > tours.length )
    {
        return res.status(404).json({
            status:'fail!',
            message:'Invalid id'
        });
    }

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    const reqObj = req.body;

    for(var x in tour)  // update tour object
    {
        if(x!=='id'){
            tour[x] = reqObj[x];
        }
    }

    tours.splice(id,1,tour); // remove that index and replace with other value

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{

        res.status(201).json({
            message:'Updated successfuly!',
            data:{
                tour: tour
            }

        });
    });

}

//delete data
const DeleteObject = (req,res) =>{

    if(req.params.id * 1> tours.length)
    {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Id!'
        });
    }

    const id = req.params.id * 1;
    tours.splice(id,1);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{

        res.status(201).json({
            message:'Updated successfuly!',
            data:{
                tour: tours
            }

        });
    });
}

// app.get('/api/v1/tours',readAllObject);
// app.get('/api/v1/tours/:id',readSingleObject);
// app.post('/api/v1/tours',createObject);
// app.patch('/api/v1/tours/:id',updateObject );
// app.delete('/api/v1/tours/:id',DeleteObject);


app
   .route('/api/v1/tours')
   .get(readAllObject)
   .post(createObject);

app
   .route('/api/v1/tours/:id')
   .get(readSingleObject)
   .patch(updateObject)
   .delete(DeleteObject);


app.listen(port, ()=>{
    console.log(`App running on port ${port}..`);
});
