const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'}); // here will pass an object to env so it will understand where the configuration file is located
// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`App running on port ${port}..`);
});