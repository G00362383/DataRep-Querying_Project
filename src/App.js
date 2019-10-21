import React from 'react'; // libraries
import './App.css';

import Content from './components/content'; // Content.js file

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import { Navbar, Nav } from 'react-bootstrap'; // Bootstrap Navbar

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/create';
import Read from './components/read';

// CONTROL CENTER OF THE APPLICATION

// index.html => index.js => App.js

// Business logic here

// component called App
class App extends React.Component {
  render() { // draws the below code
    return (
      <Router>
        <div className="App">

          <Navbar bg="primary" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Read</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Content} />
            <Route path="/read" component={Read} />
            <Route path="/create" component={Create} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
