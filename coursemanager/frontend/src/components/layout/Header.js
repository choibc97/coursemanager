import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <Navbar expand="sm">
        <Container>
          <Navbar.Brand href="#" sticky="top">
            Home
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="#feature">Feature</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={"filler"}>
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
