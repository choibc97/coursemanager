import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import {
  getStudentAssignment,
  editStudentAssignment
} from "../../actions/assignments";
import { formatQrString, timestampToString } from "../../actions/utility";

export class Checkout extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    instructorCourses: PropTypes.array.isRequired,
    taCourses: PropTypes.array.isRequired,
    studentAssignment: PropTypes.object,
    assignment: PropTypes.object,
    getStudentAssignment: PropTypes.func.isRequired,
    editStudentAssignment: PropTypes.func.isRequired
  };

  state = {
    qrCode: "",
    display: false,
    pointsEarned: "",
    comment: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFind = e => {
    e.preventDefault();

    const { student, assignment } = formatQrString(this.state.qrCode);
    this.props.getStudentAssignment(student, assignment).then(res => {
      if (res) {
        this.setState({ display: true });
      }
    });
  };

  onCheckout = e => {
    e.preventDefault();

    const { student, assignment } = this.props.studentAssignment;
    const completed = true;
    const points_earned =
      this.state.pointsEarned === ""
        ? this.props.assignment.points
        : this.state.pointsEarned;
    const { comment } = this.state;
    const grader = this.props.user.email;

    const studentAssignment = { completed, points_earned, grader, comment };
    this.props
      .editStudentAssignment(student, assignment, studentAssignment)
      .then(res => {
        if (res) {
          this.setState({
            qrCode: "",
            display: false,
            pointsEarned: "",
            comment: ""
          });
        }
      });
  };

  render() {
    if (
      this.props.instructorCourses.length === 0 &&
      this.props.taCourses.length === 0
    ) {
      return (
        <Container>
          <p className="text-center">
            You are not an instructor or a TA for any course on WUSTL Course
            Manager, meaning you cannot check out anyone's work. Please contact
            your professor if you believe this is a mistake.
          </p>
        </Container>
      );
    }

    const { assignment } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h2>QR Code Checkout</h2>
          </Col>
        </Row>
        <Form onSubmit={this.onFind}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>QR Code String</Form.Label>
              <Form.Control
                onChange={this.onChange}
                type="text"
                name="qrCode"
                value={this.state.qrCode}
                placeholder="johndoe@wustl.edu_1"
              />
            </Form.Group>
            <Form.Group as={Col} className="col-auto ml-auto align-self-end">
              <Button type="submit">Find</Button>
            </Form.Group>
          </Form.Row>
        </Form>
        {this.state.display ? (
          <Form onSubmit={this.onCheckout}>
            <Form.Group>
              <Form.Label>Points Earned</Form.Label>
              <InputGroup>
                <Form.Control
                  onChange={this.onChange}
                  type="number"
                  name="pointsEarned"
                  value={this.state.pointsEarned}
                  placeholder="Blank means full credit"
                  min="0"
                  max={`${assignment.points}`}
                />
                <InputGroup.Append>
                  <InputGroup.Text>/ {assignment.points}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comments</Form.Label>
              <Form.Control
                onChange={this.onChange}
                as="textarea"
                rows="5"
                name="comment"
                value={this.state.comment}
                placeholder="Great work!! :)"
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Checkout</Button>
            </Form.Group>
          </Form>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  instructorCourses: state.courses.instructorCourses,
  taCourses: state.courses.taCourses,
  studentAssignment: state.assignments.studentAssignment,
  assignment: state.assignments.assignment
});

const mapDispatchToProps = { getStudentAssignment, editStudentAssignment };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
