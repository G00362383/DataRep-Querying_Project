import React from 'react';
import SoldItems from './soldItems';
import '../App.css';

// component called App
class Sold extends React.Component {
    // the bit that we're going to see on the screen
    render() {
        // pulls mySales collection 
        // array of sales, map - takes an array and breaks it apart, one at a time
        // embed SoldItems is a component

        //ReloadDataMethod - passed down to SoldItems
        return this.props.mySales.map((sale) => {
            return <SoldItems key={sale._id} sale={sale} ReloadDataMethod={this.props.ReloadDataMethod}></SoldItems> // each getting on individual object
        });
    }
}

export default Sold;