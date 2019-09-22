const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'}); // here will pass an object to env so it will understand where the configuration file is located
// console.log(app.get('env'));
// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=> console.log('Db Connection Successful!') );


const tourSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true,'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.2
    },
    price: {
        type: Number,
        require: [true,'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour',tourSchema);
const testTour = new Tour({
    name: 'sajal',
    rating: 4.5,
    price: 100
});

testTour
    .save()
    .then(doc =>{
    console.log(doc);
})
.catch(err=>{
    console.log('error: '+err);
});

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`App running on port ${port}..`);
});