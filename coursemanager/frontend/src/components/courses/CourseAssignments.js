import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import {
  createAssignmentGroup,
  getAssignmentGroups
} from "../../actions/assignments";

export class CourseAssignments extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    assignmentGroups: PropTypes.array.isRequired,
    createAssignmentGroup: PropTypes.func.isRequired,
    getAssignmentGroups: PropTypes.func.isRequired
  };

  state = {
    title: "",
    points: ""
  };

  componentDidMount() {
    this.props.getAssignmentGroups(this.props.course.id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const course = this.props.course.id;
    const { title, points } = this.state;

    const assignmentGroup = { course, title, points };
    this.props.createAssignmentGroup(assignmentGroup).then(res => {
      if (res) {
        this.setState({
          title: "",
          points: ""
        });
      }
    });
  };

  render() {
    const isInstructor = new Set(
      this.props.course.instructors.map(instructor => instructor.email)
    ).has(this.props.user.email);

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
          <Form.Group as={Col} className="col-auto">
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
        {this.props.assignmentGroups.length === 0 ? (
          <Row>
            <Col>
              <p className="text-center">Assignments will appear here.</p>
            </Col>
          </Row>
        ) : (
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col className="col-auto mr-auto">
                  <h4 className="text-info">Assignment Group</h4>
                </Col>
                <Col className="col-auto">
                  <h4 className="text-info">Total Points</h4>
                </Col>
              </Row>
            </ListGroup.Item>
            {this.props.assignmentGroups.map(group => (
              <ListGroup.Item key={group.id}>
                <Row>
                  <Col className="col-auto mr-auto">
                    <Link
                      to={`/courses/${this.props.course.id}/assignments/${group.id}/view`}
                    >
                      <p>{group.title}</p>
                    </Link>
                  </Col>
                  <Col className="col-auto">
                    <p>{group.points}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  assignmentGroups: state.assignments.assignmentGroups
});

const mapDispatchToProps = {
  createAssignmentGroup,
  getAssignmentGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseAssignments);
