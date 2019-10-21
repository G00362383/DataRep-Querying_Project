import React from 'react';
import axios from 'axios';

// index.html => index.js => App.js

// component called App
class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Title: '', Year: '', Poster: '' };

        this.handleChangeMovieTitle = this.handleChangeMovieTitle.bind(this);
        this.handleChangeMovieYear = this.handleChangeMovieYear.bind(this);
        this.handleChangeMoviePoster = this.handleChangeMoviePoster.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMovieTitle(e) {
        this.setState({ Title: e.target.value });
    }

    handleChangeMovieYear(e) {
        this.setState({ Year: e.target.value });
    }

    handleChangeMoviePoster(e) {
        this.setState({ Poster: e.target.value });
    }

    // called when submit button is hit
    handleSubmit(e) {
        alert('Title: ' + this.state.Title + "\nYear: " + this.state.Year + "\nPoster: " + this.state.Poster);
        e.preventDefault();

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }; 

        axios.post('http://localhost:4000/api/movies', newMovie)
        .then()
        .catch();

        this.setState({
            Title: '',
            Year: '',
            Poster: ''
        });
    }

    render() { // the bit that we're going to see on the screen
        return (
            <div>
                <h2>This is the Create component</h2>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Movie Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.handleChangeMovieTitle}
                        />     

                        <label>Movie Release Year:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.handleChangeMovieYear}
                        />

                        <label>Movie Poster URL:</label>
                        <textarea
                            className="form-control"
                            rows='6'
                            value={this.state.Poster}
                            onChange={this.handleChangeMoviePoster}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" />
                    </div>

                </form>
            </div>
        );
    }
}

export default Create;