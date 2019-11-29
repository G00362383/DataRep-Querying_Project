const express = require('express')
const app = express()
const port = 4000 // react uses port 3000, so use a different port
const bodyParser = require('body-parser'); // bodyParser for POST
const path = require('path');
const cors = require('cors');

// for connecting to mongoDB - BMW Car Sales
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://admin:admin@cluster0-le9xj.mongodb.net/bmwcarsales?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// config lines
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, '../build')));
//app.use('/static', express.static(path.join(__dirname, 'build//static')));

// new mongoose Schema
const Schema = mongoose.Schema;

// blue print of what we're going to store/ docs to look like
const carSchema = new Schema({
    model: String,
    engine: String,
    image: String,
    mileage: String,
    registration: String,
    price: String
})

// generates a model of carSchema
const CarModel = mongoose.model('cars', carSchema);
const CarSoldModel = mongoose.model('sales', carSchema);

// CRUD: POST - GET - PUT - DELETE on cars in the mongodb ========================

// Crud: POST data mongodb
app.post('/api/cars', (req, res) => {

    // CarModel (model of carSchema)
    CarModel.create({
        model: req.body.model,
        engine: req.body.engine,
        image: req.body.image,
        mileage: req.body.mileage,
        registration: req.body.registration,
        price: req.body.price
    })
        .then(() => {
            res.json("Post Recieved!");
        })
        .catch(() => {
            res.json("Post Failed!");
        })
})

// cRud - GET the contents of cars
app.get('/api/cars', (req, res) => {
    CarModel.find((error, data) => {
        res.json({ cars: data });
    })
});

// cRud - GET - find car by id in cars mongo database
app.get('/api/cars/:id', (req, res) => {
    //console.log(req.params.id);

    CarModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

// crUd - PUT (updates record (overwrites)) 
app.put('/api/cars/:id', (req, res) => {

    // body will pass up Mileage, Price, Image
    CarModel.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true },
        (error, data) => {
            res.json(data);
        })
})

// cruD - DELETE data from the mongodb
app.delete('/api/cars/:id', (req, res) => {
    CarModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            if (error) {
                res.json(error);
            }
            else {
                res.json(data);
            }
        })
})

// USE TO FIND CAR BY MODEL - pass up a car model
app.get('/api/cars/search/:model', (req, res) => {
    console.log(req.params.model);

    CarModel.findOne({ model: req.params.model }, (error, data) => {
        //console.log({cars:data})
        res.json({ cars: data });
    })
});

// CRUD: POST - GET - PUT - DELETE on sales in the mongodb ========================

// Crud: POST data mongodb
app.post('/api/sales', (req, res) => {

    // CarSoldModel (model of carSchema)
    CarSoldModel.create({
        model: req.body.model,
        engine: req.body.engine,
        image: req.body.image,
        mileage: req.body.mileage,
        registration: req.body.registration,
        price: req.body.price
    })
        .then(() => {
            res.json("Post Recieved!");
        })
        .catch(() => {
            res.json("Post Failed!");
        })
})

// cRud - GET the contents of sales
app.get('/api/sales', (req, res) => {
    CarSoldModel.find((error, data) => {
        res.json({ sales: data });
    })
});

// cruD - DELETE data from the mongodb
app.delete('/api/sales/:id', (req, res) => {
    CarSoldModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            if (error) {
                res.json(error);
            }
            else {
                res.json(data);
            }
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// the above creates a basic server 