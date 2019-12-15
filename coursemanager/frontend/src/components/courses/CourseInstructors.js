import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { editCourse } from "../../actions/courses";

export class CourseInstructors extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    editCourse: PropTypes.func.isRequired
  };

  state = {
    instructors: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const isInstructor = new Set(
      this.props.course.instructors.map(instructor => instructor.id)
    ).has(this.props.user.id);

    const addForm = (
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Instructor Emails</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="email"
              name="instructors"
              value={this.state.instructors}
              placeholder="janedoe@wustl.edu, johndoe@wustl.edu"
              multiple
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
          <Col>{isInstructor ? addForm : null}</Col>
        </Row>
        {this.props.course.instructors.length === 0 ? (
          <Row>
            <Col>
              <p className="text-center">Instructors will appear here.</p>
            </Col>
          </Row>
        ) : null}
        {this.props.course.instructors.map(instructor => (
          <Row key={instructor.id}>
            <Col className="col-auto mr-auto">{`${instructor.first_name} ${instructor.last_name}`}</Col>
            <Col className="col-auto">
              <a href={`mailto:${instructor.email}`}>{instructor.email}</a>
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  editCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseInstructors);
