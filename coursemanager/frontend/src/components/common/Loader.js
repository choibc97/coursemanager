import React, { Component } from "react";

import Spinner from "react-bootstrap/Spinner";

export default class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
