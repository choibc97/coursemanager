import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { createCourse } from "../../actions/courses";

export class CreateCourse extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    createCourse: PropTypes.func.isRequired
  };

  state = {
    courseId: "",
    title: "",
    tas: "",
    created: null
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const course_id = this.state.courseId;
    const title = this.state.title;
    const instructors = [this.props.user.id];
    const course = { course_id, title, instructors };

    this.props
      .createCourse(course)
      .then(res => this.setState({ created: res }));
  };

  render() {
    const isStaff = this.props.user.is_staff;

    if (!isStaff) {
      return <Redirect to="/courses" />;
    }

    if (this.state.created) {
      return <Redirect to={`/courses/${this.state.created.id}/view`} />;
    }

    return (
      <Container>
        <h2>Create Course</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Course ID</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              name="courseId"
              value={this.state.courseId}
              placeholder="CSE 131"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Computer Science I"
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Publish</Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = { createCourse };

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
