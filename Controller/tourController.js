const fs = require('fs');
 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// when we insert invalid id it will throw this error and by this method we replace all duplicate error message
// and from now we don't need to worry about validation inside the route handler we will do it here
exports.checkId = (req,res,next,val)=>
{
    console.log(`Tour id is ${val}`);

    if(req.params.id * 1> tours.length)
    {
        return res.status(404).json({
            status:'Fail!',
            message:'Invalid Id'
        });
    }
    next();
}

//read all object data
exports.readAllObject = (req,res)=>{

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
exports.readSingleObject = (req, res) => {  // responding to url parameters

    //console.log(req.params); // req.params are store all the variable store inside the url

    const id = req.params.id * 1; // convert string to number & javascript will convert it when we multipy it by a number;
    const tour = tours.find(el => el.id === id); // javascrit find that specific element from an array
    
    res.status(200).json({
        message: 'success',
        data: {
            tours: tour
        }
    });
}

//create data
exports.createObject = (req,res)=>{
    
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
exports.updateObject = (req,res)=>{
    
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
exports.DeleteObject = (req,res) =>{

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