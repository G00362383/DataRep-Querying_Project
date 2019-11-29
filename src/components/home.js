import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row } from 'react-bootstrap';
import '../App.css';

// component called App
class Home extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Card align="middle">
            <Card.Header><h4><img src="https://i.imgur.com/T4CfOTi.jpg" width="1000" height="600" ></img></h4></Card.Header>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default Home;