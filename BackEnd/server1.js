const express = require('express')
const app = express()
const port = 4000 // react uses port 3000, so use a different port
const bodyParser = require('body-parser'); // bodyParser for POST

const cors = require('cors');

// for connecting to mongoDB
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://admin:admin@cluster0-le9xj.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{useNewUrlParser:true});
//====================================================

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// config lines
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// mongo =========================================================================
const Schema = mongoose.Schema;

// blue print of what we're going to store/ docs to look like
const movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
})

// generates a model of movieSchema
const MovieModel = mongoose.model('movie', movieSchema);
//================================================================================

// get request, URL, req(request), res(response) - res to sender "Hello World"
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying');
});

// :name - this part is a parameter
app.get('/hello/:name', (req, res) => {
    // prints to the terminal below
    console.log(req.params.name);
    // response - hello plus name entered in URL
    res.send('hello ' + req.params.name);
});

app.get('/api/movies/:id', (req, res) => {

    console.log(req.params.id);

    MovieModel.findById(req.params.id, (error,data)=>{
        res.json(data);
    })
});

// api movies
app.get('/api/movies', (req, res) => {

    MovieModel.find((error,data)=>{
         res.json({movies:data});
    })


    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }
    // ];

    // movies is the object that I'm creating
    // don't need the status or message
    // res.status(200).json({ 
    //     movies: mymovies, message: 'Hello from server'
    // })
});

const path = require('path');
// return html page (index.html)
app.get('/test', (req, res) => {
    // __dirname gets me the current directory
    res.sendFile(path.join(__dirname + '/index.html'));
});

// linked to the index.html page
// /name linked to action="/name" on index.html page
app.get('/name', (req,res) =>{
    // prints to the terminal below
    console.log(req.query.firstname +" "+ req.query.lastname);
    res.send('Hello from get ' + req.query.firstname +" "+ req.query.lastname);
});

// look up express bodyparser
app.post('/name', (req,res) =>{
    console.log(req.body.firstname);
    res.send('Hello from post ' + req.body.firstname +" "+ req.body.lastname);
})

app.post('/api/movies', (req,res) => {
    console.log("Post Request Successful");
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);
    
    //mongo ======================================
    MovieModel.create({
        title:req.body.title,
        year:req.body.year,
        poster:req.body.poster
    });
    //============================================
    res.json("Post Recieved!");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// the above creates a basic server 