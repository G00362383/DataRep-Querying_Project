import React from 'react';
import CarItem from './carItem';
import '../App.css';

// component called App
class Cars extends React.Component {
    // the bit that we're going to see on the screen
    render() {
        // array of cars, map - takes an array and breaks it apart, one at a time
        // embed CarItem is a component

        //ReloadDataMethod - passed down to CarItem
        return this.props.myCars.map((car) => {
            return <CarItem key={car._id} car={car} ReloadDataMethod={this.props.ReloadDataMethod}></CarItem> // each getting on individual object
        });
    }
}

export default Cars;