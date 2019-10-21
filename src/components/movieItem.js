import React from 'react';
import Card from 'react-bootstrap/Card';

// index.html => index.js => App.js

// component called App
class MovieItem extends React.Component {
    render() { // the bit that we're going to see on the screen
        return (
            <div>
                {/* <h4>{this.props.movie.Title}</h4>
                <p>{this.props.movie.Year}</p>
                img src={this.props.movie.Poster}></img> */}
                
                <Card>
                    <Card.Header><h4>{this.props.movie.Title}</h4></Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.Poster}></img>
                            <footer>
                                {this.props.movie.Year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default MovieItem;

