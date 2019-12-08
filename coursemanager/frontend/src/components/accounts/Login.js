import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

export class Login extends Component {
  static propTypes = {};

  render() {
    return (
      <Container>
        <Row>
          <Col md={6} className="m-auto">
            <Card className="mt-5">
              <Card.Body>
                <h2 className="text-center">Login</h2>
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                  <Form.Group>
                    <Button type="submit">Login</Button>
                  </Form.Group>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
