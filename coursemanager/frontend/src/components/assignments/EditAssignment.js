import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { editAssignment, getAssignment } from "../../actions/assignments";

export class EditAssignment extends Component {
  static propTypes = {
    assignment: PropTypes.object,
    editAssignment: PropTypes.func.isRequired,
    getAssignment: PropTypes.func.isRequired
  };

  state = {
    initialized: false,
    edited: null,
    title: "",
    points: "",
    dueDate: ""
  };

  componentDidMount() {
    const { course, assignment } = this.props.match.params;
    const isInstructor = this.props.instructorCourses.has(course);

    if (isInstructor) this.props.getAssignment(assignment);
  }

  componentDidUpdate(prevProps) {
    const { assignment } = this.props;
    if (
      !this.state.initialized &&
      assignment != null &&
      this.props.match.params.assignment == assignment.id
    ) {
      this.setState({
        initialized: true,
        title: assignment.title,
        points: assignment.points,
        dueDate: assignment.due_date
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const id = this.props.assignment.id;
    const { title, points } = this.state;
    const due_date = this.state.dueDate;
    const assignment = { id, title, points, due_date };
    this.props.editAssignment(assignment).then(res => {
      this.setState({ edited: res });
    });
  };

  render() {
    const { course, group } = this.props.match.params;
    const isInstructor = this.props.instructorCourses.has(course);

    if (!isInstructor || this.state.edited) {
      return <Redirect to={`/courses/${course}/assignments/${group}`} />;
    }

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Lab0"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Points</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="number"
              name="points"
              value={this.state.points}
              placeholder="10"
              min="0"
              max="32767"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date (in CT)</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="datetime-local"
              name="dueDate"
              value={this.state.dueDate}
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
  instructorCourses: new Map(
    state.courses.instructorCourses.map(course => [`${course.id}`, course])
  ),
  assignment: state.assignments.assignment
});

const mapDispatchToProps = { editAssignment, getAssignment };

export default connect(mapStateToProps, mapDispatchToProps)(EditAssignment);
