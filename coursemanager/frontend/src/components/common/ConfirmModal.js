import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class ConfirmModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired
  };

  render() {
    return (
      <Modal centered show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-center">{this.props.msg}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.confirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
