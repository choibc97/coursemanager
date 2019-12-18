import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QRCode from "qrcode.react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Loader from "../common/Loader";
import Breadcrumbs from "../layout/Breadcrumbs";

import { getStudentAssignment } from "../../actions/assignments";
import { timestampToString } from "../../actions/utility";

export class StudentAssignmentView extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    studentCourses: PropTypes.object.isRequired,
    assignment: PropTypes.object,
    studentAssignment: PropTypes.object,
    getStudentAssignment: PropTypes.func.isRequired
  };

  componentDidMount() {
    const student = this.props.user.email;
    const { assignment } = this.props.match.params;

    this.props.getStudentAssignment(student, assignment);
  }

  render() {
    const courseId = this.props.match.params.course;

    const isStudent = this.props.studentCourses.has(courseId);

    if (!isStudent) {
      <Container>
        <p className="text-center">
          This assignment either does not exist or you do not have permission to
          access it. Please contact the sys admin if you believe this is a
          mistake.
        </p>
      </Container>;
    }

    if (this.props.studentAssignment === null) {
      return <Loader />;
    }

    const course = this.props.studentCourses.get(courseId);
    const { assignment, studentAssignment } = this.props;

    return (
      <Container>
        <Breadcrumbs path={this.props.location.pathname} />
        <Row className="align-items-center mb-3">
          <Col className="col-auto mr-auto">
            <h2>{`${course.course_id}: ${assignment.title}`}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="text-warning">Points: {assignment.points}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="text-danger">
              Due: {timestampToString(new Date(assignment.due_date))}
            </h4>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col>
            <QRCode value={this.props.studentAssignment.qr_code} size={256} />
          </Col>
          <Col>
            <Row>
              <Col>
                <p className="text-info">
                  QR code as string: {studentAssignment.qr_code}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{`${this.props.user.first_name} ${this.props.user.last_name}: ${this.props.user.email}`}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Completed:{" "}
                  {this.props.studentAssignment.completed ? "Yes" : "No"}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Points earned: {studentAssignment.points_earned} /{" "}
                  {assignment.points}
                </p>
              </Col>
            </Row>
            {studentAssignment.grader ? (
              <Fragment>
                <Row>
                  <Col>
                    <p>Late: {studentAssignment.is_late ? "Yes" : "No"}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{`Graded by ${
                      studentAssignment.graer
                    } at ${timestampToString(
                      new Date(studentAssignment.timestamp)
                    )}`}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Comments: {studentAssignment.comment}</p>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  studentCourses: new Map(
    state.courses.studentCourses.map(course => [`${course.id}`, course])
  ),
  assignment: state.assignments.assignment,
  studentAssignment: state.assignments.studentAssignment
});

const mapDispatchToProps = { getStudentAssignment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAssignmentView);
