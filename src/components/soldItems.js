import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../App.css';

// component called App
class SoldItems extends React.Component {

    constructor() {
        super();
        this.DeleteCar = this.DeleteCar.bind(this);
    }

    DeleteCar(e) {
        e.preventDefault();

        // listening for a delete request in server1.js
        // deletes a car from the sales database on mongo
        axios.delete("http://localhost:4000/api/sales/" + this.props.sale._id)
            .then(() => {
                this.props.ReloadDataMethod();
            })
            .catch();
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
                                    <ul><img width="510" height="250" src={this.props.sale.image}></img></ul>
                                    <ul><b>Model: </b>{this.props.sale.model}</ul>
                                    <ul><b>Engine: </b>{this.props.sale.engine}</ul>
                                    <ul><b>Mileage: (km) </b>{this.props.sale.mileage}</ul>
                                    <ul><b>Registration: </b>{this.props.sale.registration}</ul>
                                    <ul><b>Price: €</b>{this.props.sale.price}</ul>
                                </div>
                            </Card.Body>
                            <div align="center">
                                <Button className="btn btn-dark" style={{ width: '8rem' }} onClick={this.DeleteCar}> Delete</Button>&nbsp;
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

export default SoldItems;