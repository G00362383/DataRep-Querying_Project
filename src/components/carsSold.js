import React from 'react';
import Sold from './sold';
import axios from 'axios';
import '../App.css';

// component called CarsSold
class CarsSold extends React.Component {

    // constructor to reload the data
    constructor() {
        super();
        this.ReloadDataMethod = this.ReloadDataMethod.bind(this);
    }

    // sales array to hold all car sales details
    state = {
        sales: []
    };

    //call back function
    componentDidMount() {
        // listening for a get request in server1.js
        // run method, then (gets info), otherwise catch error
        axios.get('http://localhost:4000/api/sales')
            .then((response) => { // arrow function
                this.setState({ sales: response.data.sales });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // reload data after deleting car
    ReloadDataMethod() {
        // listening for a get request in server1.js
        axios.get('http://localhost:4000/api/sales')
            .then((response) => { // arrow function
                this.setState({ sales: response.data.sales });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div><br></br>
                <h2 align='middle'>Sold Cars</h2>
                <Sold mySales={this.state.sales} ReloadDataMethod={this.ReloadDataMethod}> </Sold>
            </div>
        );
    }
}

export default CarsSold;