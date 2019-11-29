import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import '../App.css';

// component called EditCars
class EditCars extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Base64Image: '',
            Mileage: '',
            Price: '',
            _id: ''
        };

        // edit the image, mileage and price of the car
        this.handleChangeCarBase64Image = this.handleChangeCarBase64Image.bind(this);
        this.handleChangeCarMileage = this.handleChangeCarMileage.bind(this);
        this.handleChangeCarPrice = this.handleChangeCarPrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ReloadDataMethod = this.ReloadDataMethod.bind(this);
    }

    componentDidMount() {
        //alert(this.props.match.params.id);

        // listening for a get request in server1.js
        // get details from the cars API on mongo
        axios.get('http://localhost:4000/api/cars/' + this.props.match.params.id)
            .then((response) => {
                
                // set state
                this.setState({
                    Base64Image: response.data.Base64Image,
                    _id: response.data._id,
                    Mileage: response.data.mileage,
                    Price: response.data.price
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // reload data after editing the car details
    ReloadDataMethod() {
        // listening for a get request in server1.js
        axios.get('http://localhost:4000/api/cars')
            .then((response) => { // arrow function
                this.setState({ cars: response.data.cars });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // method to change the car image
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
   
    // method to handle the change to the car Mileage
    handleChangeCarMileage(e) {
        this.setState({ Mileage: e.target.value });
    }

    // method to handle the change to the car price
    handleChangeCarPrice(e) {
        this.setState({ Price: e.target.value });
    }

    // called when submit button is hit
    handleSubmit(e) {
        e.preventDefault();

        // creates a new object -  new details that is going to be sent to the mongo database
        const newBMW = {
            image: this.state.Base64Image,
            mileage: this.state.Mileage,
            price: this.state.Price
        };

        // listening for a put request in server1.js
        // edits (updates) the car details and send (put) it to the database on mongo
        axios.put("http://localhost:4000/api/cars/" + this.state._id, newBMW)
            .then(window.location = "/availableCars/")
            .catch((error) => {
                console.log(error);
            });

        // set the state
        this.setState({
            Base64Image: '',
            Mileage: '',
            Price: ''
        });
    }

    render() { // the bit that we're going to see on the screen
        return (
            <div>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                        <br></br><br></br>
                        <h2>Edit Car Details</h2>
                        <form onSubmit={this.handleSubmit}>
                            <Card border="primary" align="left" style={{ width: '40rem' }}>
                                <Card.Body>
                                    <div className="form-group">

                                        <label>Car Mileage:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Mileage}
                                            onChange={this.handleChangeCarMileage}
                                        />

                                        <label>Car Price:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.Price}
                                            onChange={this.handleChangeCarPrice}
                                        />
                                    </div>

                                    <label>Car Image:</label><br></br>
                                    <input className="btn btn-dark" type="file" name="file" onChange={this.handleChangeCarBase64Image} />

                                    <div className="form-group"><br></br>
                                        <input className="btn btn-dark" type="submit" value="Submit" />
                                    </div>
                                </Card.Body>
                            </Card>
                        </form>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCars;