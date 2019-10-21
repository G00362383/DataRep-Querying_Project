import React from 'react';
import MovieItem from './movieItem';

// index.html => index.js => App.js

// component called App
class Movies extends React.Component {
    // the bit that we're going to see on the screen
    render() {
        // pulls myMovies collection apart
        return this.props.myMovies.map((movie) => {
            return <MovieItem key={movie.imdbID} movie={movie}></MovieItem> // each getting on individual object
        });
    }
}

export default Movies;