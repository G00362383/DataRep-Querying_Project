import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

// component called App
class CarItem extends React.Component {

    constructor() {
        super();
        this.DeleteCar = this.DeleteCar.bind(this);
        this.SoldCar = this.SoldCar.bind(this);
    }

    // method to delete a car from the car db on mongodb
    DeleteCar(e) {
        e.preventDefault();

        // listening for a delete request in server1.js
        axios.delete("http://localhost:4000/api/cars/" + this.props.car._id)
            .then(() => {
                // reloads the updated cars db
                this.props.ReloadDataMethod();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // method to delete a car from the car db on mongodb because it has been sold
    // and post it to the sales database on mongo
    SoldCar(e) {
        e.preventDefault();

        // creates a new object -  new details that is going to be sent to the mongo database
        const soldCar = {
            image: this.props.car.image,
            model: this.props.car.model,
            engine: this.props.car.engine,
            mileage: this.props.car.mileage,
            registration: this.props.car.registration,
            price: this.props.car.price
        };

        // listening for a post request in server1.js
        // post sold car to the sales database on mongo
        axios.post("http://localhost:4000/api/sales/", soldCar)
            .then(() => {

                // listening for a delete request in server1.js
                // deletes car from the cars database on mongo
                axios.delete("http://localhost:4000/api/cars/" + this.props.car._id)
                    .then(() => {
                        this.props.ReloadDataMethod();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                        <Card border="primary" align="left" style={{ width: '40rem' }}>
                            <Card.Body>
                                <div>
                                    <ul><img width="510" height="250" src={this.props.car.image}></img></ul>
                                    <ul><b>Model: </b>{this.props.car.model}</ul>
                                    <ul><b>Engine: </b>{this.props.car.engine}</ul>
                                    <ul><b>Mileage: (km) </b>{this.props.car.mileage}</ul>
                                    <ul><b>Registration: </b>{this.props.car.registration}</ul>
                                    <ul><b>Price: €</b>{this.props.car.price}</ul>
                                </div>
                            </Card.Body>
                            <div align="center">
                                <button className="btn btn-dark" style={{ width: '8rem' }} onClick={this.DeleteCar}>Remove</button>&nbsp;
                                <button className="btn btn-dark" style={{ width: '8rem' }} onClick={this.SoldCar}>Sold</button>&nbsp;
                                <Link className="btn btn-dark" style={{ width: '8rem' }} to={"/editCar/" + this.props.car._id}>Edit</Link>
                            </div><br></br>
                        </Card>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        );
    }
}

export default CarItem;