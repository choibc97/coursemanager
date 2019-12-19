import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Breadcrumbs from "../layout/Breadcrumbs";

import {
  editAssignmentGroup,
  getAssignmentGroup
} from "../../actions/assignments";

export class EditAssignmentGroup extends Component {
  static propTypes = {
    instructorCourses: PropTypes.object.isRequired,
    assignmentGroup: PropTypes.object,
    editAssignmentGroup: PropTypes.func.isRequired,
    getAssignmentGroup: PropTypes.func.isRequired
  };

  state = {
    initialized: false,
    edited: null,
    title: "",
    points: ""
  };

  componentDidMount() {
    const { course, group } = this.props.match.params;
    const isInstructor = this.props.instructorCourses.has(course);

    if (isInstructor) this.props.getAssignmentGroup(group);
  }

  componentDidUpdate(prevProps) {
    const { assignmentGroup } = this.props;
    if (
      !this.state.initialized &&
      assignmentGroup != null &&
      this.props.match.params.group == assignmentGroup.id
    ) {
      this.setState({
        initialized: true,
        title: assignmentGroup.title,
        points: assignmentGroup.points
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const id = this.props.assignmentGroup.id;
    const { title, points } = this.state;
    const assignmentGroup = { id, title, points };
    this.props.editAssignmentGroup(assignmentGroup).then(res =>
      this.setState({
        edited: res
      })
    );
  };

  render() {
    const { course, group } = this.props.match.params;
    const isInstructor = this.props.instructorCourses.has(course);

    if (!isInstructor || this.state.edited) {
      return <Redirect to={`/courses/${course}/assignments/${group}/view`} />;
    }

    return (
      <Container>
        <Breadcrumbs path={this.props.location.pathname} />
        <h2>Edit Assignment Group</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Labs"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Points</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="number"
              name="points"
              value={this.state.points}
              placeholder="30"
              min="0"
              max="32767"
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
  assignmentGroup: state.assignments.assignmentGroup
});

const mapDispatchToProps = { editAssignmentGroup, getAssignmentGroup };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAssignmentGroup);
