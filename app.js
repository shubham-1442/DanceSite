const express = require("express");
const path = require("path");
const fs= require("fs");
const app = express();
const bodyparser= require("body-parser")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;


//Defind mongoose schema
const contactSchema = new mongoose.Schema({
    Name: String,
    Age : String,
    Email: String,
    phone: String,
    
  });

const contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) //for serving static file
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine','pug') //Set the template engine as pug

app.set('views',path.join(__dirname,'views')) //set the views directory


//ENDPOINTS
app.get('/', (req,res)=>{
    
    const params ={}
    res.status(200).render('home.pug',params);
}
)
app.get('/contact', (req,res)=>{
    
    const params ={}
    res.status(200).render('contact.pug',params);
}
)
app.post('/contact', (req,res)=>{
    const myData = new contact(req.body);
     myData.save().then(()=> {
        res.send("This item has been submitted succesfully")
    })
}
)

//START THE SERVER
app.listen(port,()=>{
    console.log(`The Application Started Succesfully on port ${port}`);
}
);