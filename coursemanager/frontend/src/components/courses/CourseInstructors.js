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

    const { id } = this.props.course;
    const instructors = [
      ...this.props.course.instructors.map(instructor => instructor.email),
      ...this.state.instructors.split(",").filter(Boolean)
    ];

    const course = { id, instructors };
    this.props.editCourse(course).then(res => {
      if (res) {
        this.setState({ instructors: "" });
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
      <Container className="mt-3">
        <Row>
          <Col>{isInstructor ? addForm : null}</Col>
        </Row>
        {this.props.course.instructors.length === 0 ? (
          <Row>
            <Col>
              <p className="text-center">Instructors will appear here.</p>
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
              {this.props.course.instructors.map(instructor => (
                <tr key={instructor.email}>
                  <td>
                    <p>{`${instructor.first_name} ${instructor.last_name}`}</p>
                  </td>
                  <td>
                    <a href={`mailto:${instructor.email}`}>
                      <p>{instructor.email}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseInstructors);
