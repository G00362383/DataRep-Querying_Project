import React from 'react'; // libraries
import Home from './components/home'; // Home.js file
import NewCar from './components/newCar';
import AvailableCars from './components/availableCars';
import CarsSold from './components/carsSold';
import EditCars from './components/editCar';
import SearchedCar from './components/searchedCar';
import AboutUs from './components/aboutUs';

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Bootstrap Navbar
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// CONTROL CENTER OF THE APPLICATION
// Business logic here

// component called App
class App extends React.Component {

  render() {

    return (

      <Router>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">BMW Car Sales</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/availableCars">Available Cars</Nav.Link>
              <Nav.Link href="/newCar">New Car</Nav.Link>
              <Nav.Link href="/carsSold">Sold Cars</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/searchedCar">Search Model</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/aboutUs">About Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="http://www.bmw.ie/" target="_blank">www.bmw.ie</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/availableCars" component={AvailableCars} />
          <Route path="/newCar" component={NewCar} />
          <Route path="/carsSold" component={CarsSold} />
          <Route path="/editCar/:id" component={EditCars} />
          <Route path="/searchedCar" component={SearchedCar} />
          <Route path="/aboutUs" component={AboutUs} />
        </Switch>
      </Router>
    );
  }
}

export default App;
