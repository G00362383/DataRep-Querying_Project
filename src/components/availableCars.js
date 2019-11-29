import React from 'react';
import Cars from './cars';
import axios from 'axios';
import '../App.css';

// component called AvailableCars
class AvailableCars extends React.Component {

    // constructor to reload the data
    constructor() {
        super();
        // method to reload the page with the updated cars API info - 'http://localhost:4000/api/cars'
        this.ReloadDataMethod = this.ReloadDataMethod.bind(this);
    }

    // cars array to hold all car details
    state = {
        cars: []
    };

    //call back function
    componentDidMount() {
        // listening for a get request in server1.js
        // run method, then (gets info), otherwise catch error
        axios.get('http://localhost:4000/api/cars')
            .then((response) => { // arrow function
                this.setState({ cars: response.data.cars });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // reload data after deleting car
    ReloadDataMethod() {
        axios.get('http://localhost:4000/api/cars')
            .then((response) => { // arrow function
                this.setState({ cars: response.data.cars });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // the view - what the user will see on screen
    //availableCar - grandparent
    //Cars - parent
    //CarItem - child
    // ReloadDataMethod={this.ReloadDataMethod} - been passed down to Cars

    render() {
        return (
            <div>
                <br></br>
                <h2 align='middle'>Available Cars For Sale</h2>
                {/* send car state details to the Cars component */}
                <Cars myCars={this.state.cars} ReloadDataMethod={this.ReloadDataMethod} > </Cars>
            </div>
        );
    }
}

export default AvailableCars;