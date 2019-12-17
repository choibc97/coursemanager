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

import { login } from "../../actions/auth";

export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col md={6} className="m-auto">
            <Card className="mt-5">
              <Card.Body>
                <h2 className="text-center">Login</h2>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group>
                    <Form.Label>WUSTL Email</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.onChange}
                      name="email"
                      value={this.state.email}
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
                    <Button type="submit">Login</Button>
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
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
