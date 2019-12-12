import React, { Component } from "react";

import Container from "react-bootstrap/Container";

export default class About extends Component {
  render() {
    return (
      <Container>
        <p className="text-center">
          This project was created by Benjamin Choi (WUSTL 2019) for his
          master's project. Please maintain proper attribution.
        </p>
      </Container>
    );
  }
}
