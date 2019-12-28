import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (!isAuthenticated) {
      return null;
    }

    const { instructorCourses, taCourses } = this.props.courses;
    const enableCheckout =
      instructorCourses.length !== 0 || taCourses.length !== 0;

    return (
      <Navbar expand="sm">
        <Container>
          <Navbar.Brand href="/#/" sticky="top">
            Home
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="/#/courses">Courses</Nav.Link>
              {enableCheckout ? (
                <Nav.Link href="/#/checkout">Checkout</Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              <NavDropdown title={`${user.email}`}>
                <NavDropdown.Item onClick={this.props.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
