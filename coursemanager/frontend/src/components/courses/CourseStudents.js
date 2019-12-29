import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { editCourse } from "../../actions/courses";

export class CourseStudents extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    editCourse: PropTypes.func.isRequired
  };

  state = {
    students: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.course;
    const students = [
      ...this.props.course.students.map(student => student.email),
      ...this.state.students.split(",").filter(Boolean)
    ];

    const course = { id, students };
    this.props.editCourse(course).then(res => {
      if (res) {
        this.setState({ students: "" });
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
            <Form.Label>Student Emails</Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="email"
              name="students"
              value={this.state.students}
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
      <Container className="mt-3">
        <Row>
          <Col>{isInstructor ? addForm : null}</Col>
        </Row>
        {this.props.course.students.length === 0 ? (
          <Row>
            <Col>
              <p className="text-center">Students will appear here.</p>
            </Col>
          </Row>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <h4 className="text-info">Name</h4>
                </th>
                <th>
                  <h4 className="text-info">Email</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.course.students.map(student => (
                <tr key={student.email}>
                  <td>
                    <p>{`${student.first_name} ${student.last_name}`}</p>
                  </td>
                  <td>
                    <a href={`mailto:${student.email}`}>
                      <p>{student.email}</p>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseStudents);
