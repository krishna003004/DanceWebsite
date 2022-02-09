const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/contactdance' , {useNewUrlParser: true})
const port = 80;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String
});

var Contact = mongoose.model('Contact' ,contactSchema);

//Express specific stuff
app.use('/static' , express.static('static'))
app.use(express.urlencoded())


//Pug specific stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


//End Points
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render("home.pug",params);
})
app.post('/', (req, res)=>{
    const params = {}
    res.status(200).render("home.pug",params);
})


app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render("contact.pug",params);
})
app.post('/contact', (req, res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has benn saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
})


//Start the server
app.listen(port , ()=>{
    console.log(`The application started successfully on port ${port}`)
}
)