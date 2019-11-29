import React from 'react';
import axios from 'axios';
import '../App.css';
import Card from 'react-bootstrap/Card';

// component called App
class SearchedCar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            searchModel: '',
            modelFound: []
        }

        this.handleSearchResult = this.handleSearchResult.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    handleSearchResult(e) {
        this.setState({ searchModel: e.target.value });
    }

    handlesubmit(e) {
        e.preventDefault();

        // listening for a get request in server1.js
        // post new car to the cars database on mongo
        axios.get("http://localhost:4000/api/cars/search/" + this.state.searchModel)
            .then((response) => {
                if (response.data.cars != null) {
                    console.log(response.data.cars);
                    // cars - mongodb, result saved into modelFound
                    this.setState({ modelFound: response.data.cars })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // the bit that we're going to see on the screen
    render() {
        return (

            <div>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                        <div>
                            <div align="left" border="primary" style={{ width: '20rem' }}>
                                <h2>Search Car Model</h2>
                                <form onSubmit={this.handlesubmit}>

                                    <div className="form-group">

                                        <label>Search Model:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.searchModel}
                                            onChange={this.handleSearchResult}
                                        />
                                    </div>
                                </form>
                            </div>

                            <Card border="primary" align="left" style={{ width: '40rem' }}>
                                <Card.Body>
                                    <div>
                                        <ul><img width="510" height="250" src={this.state.modelFound.image}></img></ul>
                                        <ul><b>Model: </b>{this.state.modelFound.model}</ul>
                                        <ul><b>Engine: </b>{this.state.modelFound.engine}</ul>
                                        <ul><b>Mileage: (km) </b>{this.state.modelFound.mileage}</ul>
                                        <ul><b>Registration: </b>{this.state.modelFound.registration}</ul>
                                        <ul><b>Price: €</b>{this.state.modelFound.price}</ul>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchedCar;