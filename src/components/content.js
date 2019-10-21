import React from 'react';
import '../App.css';

// index.html => index.js => App.js

// component called App
class Content extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Content;