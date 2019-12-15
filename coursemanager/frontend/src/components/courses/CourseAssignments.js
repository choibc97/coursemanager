import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class CourseAssignments extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    title: "",
    totalPoints: "",
    dueDate: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log(this.state);
  };

  render() {
    const isInstructor = new Set(
      this.props.course.instructors.map(instructor => instructor.id)
    ).has(this.props.user.id);

    const addForm = (
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Labs"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Total Points</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="number"
              name="totalPoints"
              value={this.state.totalPoints}
              placeholder="10"
              min="0"
              max="32767"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="datetime-local"
              name="dueDate"
              value={this.state.dueDate}
            />
          </Form.Group>
          <Form.Group as={Col} className="col-auto ml-auto align-self-end">
            <Button type="submit">Add</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );

    return (
      <Container>
        <Row>
          <Col>
            {isInstructor ? (
              <Row>
                <Col>{addForm}</Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CourseAssignments);
