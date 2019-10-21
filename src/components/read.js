import React from 'react';
import Movies from './movies'; //imported
import axios from 'axios'; // import axios

// index.html => index.js => App.js

// component called App
class Read extends React.Component {

    state = {
        movies: []
    };

    //call back function
    componentDidMount() {
        // run method, then (gets info), otherwise catch error
        axios.get('http://localhost:4000/api/movies')
        .then((response)=>{ // arrow function
            this.setState({movies : response.data.movies});
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    // the view - what the user will see on screen
    render() {
        return (
            <div>
                <h2>Hello from Read component</h2>
                <Movies myMovies={this.state.movies}> </Movies>
            </div>
        );
    }
}

export default Read;