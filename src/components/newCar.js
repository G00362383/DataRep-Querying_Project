import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

// component called NewCar
class NewCar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Model: '', Engine: '', Base64Image: '', Mileage: '', Registration: '', Price: '' };

        this.handleChangeCarBase64Image = this.handleChangeCarBase64Image.bind(this);
        this.handleChangeCarModel = this.handleChangeCarModel.bind(this);
        this.handleChangeCarEngine = this.handleChangeCarEngine.bind(this);
        this.handleChangeCarMileage = this.handleChangeCarMileage.bind(this);
        this.handleChangeCarRegistration = this.handleChangeCarRegistration.bind(this);
        this.handleChangeCarPrice = this.handleChangeCarPrice.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // method to set the car image
    handleChangeCarBase64Image(e) {
        this.getBase64(e.target.files[0], (base64) => {
            this.setState({ Base64Image: base64 });
        })
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    // method to set the car model 
    handleChangeCarModel(e) {
        this.setState({ Model: e.target.value });
    }

    // method to set the car engine size 
    handleChangeCarEngine(e) {
        this.setState({ Engine: e.target.value });
    }

    // method to set the car mileage
    handleChangeCarMileage(e) {
        this.setState({ Mileage: e.target.value });
    }

    // method to set the car registration
    handleChangeCarRegistration(e) {
        this.setState({ Registration: e.target.value });
    }

    // method to set the car price
    handleChangeCarPrice(e) {
        this.setState({ Price: e.target.value });
    }

    // called when submit button is hit
    handleSubmit(e) {
        e.preventDefault();

        // creates a new object -  new details that is going to be sent to the mongo database
        const newCar = {
            image: this.state.Base64Image,
            model: this.state.Model,
            engine: this.state.Engine,
            mileage: this.state.Mileage,
            registration: this.state.Registration,
            price: this.state.Price
        };

        // listening for a post request in server1.js
        // post new car to the cars database on mongo
        axios.post('http://localhost:4000/api/cars', newCar)
            .then(window.location = "/availableCars/")
            .catch((error) => {
                console.log(error);
            });

        // set state
        this.setState({
            Base64Image: '',
            Model: '',
            Engine: '',
            Mileage: '',
            Registration: '',
            Price: ''
        });
    }

    render() { // the bit that we're going to see on the screen
        return (
            <Container>
                <Row>
                    <Col md="5">
                        <div className="row"><br></br>
                            <div border="primary" style={{ width: '30rem' }}>
                                <h2>Add New Car</h2>
                                
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Car Model:</label><br></br>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Model}
                                            onChange={this.handleChangeCarModel}
                                        />

                                        <label>Car Engine:</label><br></br>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Engine}
                                            onChange={this.handleChangeCarEngine}
                                        />

                                        <label>Car Mileage: (km)</label><br></br>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Mileage}
                                            onChange={this.handleChangeCarMileage}
                                        />

                                        <label>Car Registration:</label><br></br>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Registration}
                                            onChange={this.handleChangeCarRegistration}
                                        />

                                        <label>Car Price: €</label><br></br>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Price}
                                            onChange={this.handleChangeCarPrice}
                                        />

                                        <label>Car Image:</label><br></br>
                                        <input className="btn btn-dark" type="file" name="file" onChange={this.handleChangeCarBase64Image} />
                                    </div>

                                    <div className="form-group">
                                        <input className="btn btn-dark" type="submit" value="Submit" />
                                    </div>
                                </form>

                            </div>
                        </div>
                    </Col>
                    <Col md="auto">
                        <div><br></br><br></br><br></br><img src="https://i.imgur.com/cPFaLcR.jpg" width="600" height="400" ></img></div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NewCar;