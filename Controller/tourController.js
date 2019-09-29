const fs = require('fs');
 const Tour = require('./../models/tourModel');

//read all object data
exports.readAllObject = async (req,res)=>{

    try{
        const tour = await Tour.find(); // tour.find() will get all the document

        res.status(200).json({
            message: 'success',
            result: tour.length,
            data:{
                tour
            }
        });
    }catch(err){
        res.status(404).json({
            result: 'fail',
            message: err
        });
    }
}

//read specific data
exports.readSingleObject = async (req, res) => {  // responding to url parameters
    try{
        const tour = await Tour.findById(req.params.id); // tour.findbyid() will find a specific document
        // or we can use tour.findOne({_id:req.params.id});
            res.status(200).json({
                message: 'success',
                data: {
                    tours: tour
                }
            });

    }catch(err){

        res.status(404).json({
            result: 'fail',
            message: err
        });
    }
}

//create data
exports.createObject =  async (req,res) =>{
    
    try{
        //console.log(req.body);
        const newTour = await Tour.create(req.body); // creating documents
    
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
       });
    }
    catch(err)
    {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

//update data
exports.updateObject = async (req,res)=>{

    try{

        // here {new:true} this part is optional but when we update a document it's return true that means it's a new updated data 
        // and {runValidators:true} means if we try to update a field with invalid data it will run and throw an error
        const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, { 
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status:'Success',
            data:{
                tour:tours
            }
        });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}

//delete data
exports.DeleteObject = async (req, res) =>{

    try{
        const tours = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'success',
            message:'Deleted'
        });
    }catch(err){
        res.status(404).json({
            status:'Delete Fail',
            message: err
        });
    }
}