import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Loader from "../common/Loader";

import { getInvitation } from "../../actions/invitations";
import { createMessage } from "../../actions/messages";
import { register } from "../../actions/auth";

export class Register extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    authLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    invitation: PropTypes.object,
    getInvitation: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  };

  state = {
    firstName: "",
    lastName: "",
    password: "",
    password2: ""
  };

  componentDidMount() {
    if (this.props.isAuthenticated) return;

    const { token } = this.props.match.params;
    this.props.getInvitation(token);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.password !== this.state.password2) {
      this.props.createMessage({ passwordMismatch: "Passwords do not match" });
    } else if (!this.state.firstName || !this.state.lastName) {
      this.props.createMessage({
        missingName: "Fill out your first and last name"
      });
    } else {
      const { token } = this.props.match.params;
      this.props.register(
        token,
        this.props.invitation.recipient,
        this.state.firstName,
        this.state.lastName,
        this.state.password
      );
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.isLoading || this.props.authLoading) {
      return <Loader />;
    }

    if (!this.props.isLoading && this.props.invitation === null) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col md={6} className="m-auto">
            <Card className="mt-5">
              <Card.Body>
                <h2 className="text-center">Register</h2>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group>
                    <Form.Label>WUSTL Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.props.invitation.recipient}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.onChange}
                      name="firstName"
                      value={this.state.firstName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.onChange}
                      name="lastName"
                      value={this.state.lastName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={this.onChange}
                      name="password"
                      value={this.state.password}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={this.onChange}
                      name="password2"
                      value={this.state.password2}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button type="submit">Register</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.isLoading,
  isLoading: state.invitations.isLoading,
  invitation: state.invitations.registerInvitation
});

const mapDispatchToProps = { getInvitation, createMessage, register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
