import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withAlert } from "react-alert";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.status === 401 || error.status === 403)
        alert.error(`${error.msg.detail}`);
      if (error.status === 500)
        alert.error("There is a problem with your request.");

      if (error.msg.non_field_errors)
        alert.error(`${error.msg.non_field_errors.join(", ")}`);
      if (error.msg.id) alert.error(`ID: ${error.msg.id.join(", ")}`);
      if (error.msg.title) alert.error(`Title: ${error.msg.title.join(", ")}`);
      if (error.msg.first_name)
        alert.error(`First Name: ${error.msg.first_name.join(", ")}`);
      if (error.msg.last_name)
        alert.error(`Last Name: ${error.msg.last_name.join(", ")}`);
      if (error.msg.password)
        alert.error(`Password: ${error.msg.password.join(", ")}`);
    }

    if (message !== prevProps.message) {
      // errors
      if (message.privateRouteFail) alert.error(message.privateRouteFail);
      if (message.passwordMismatch) alert.error(message.passwordMismatch);
      if (message.missingName) alert.error(message.missingName);

      // successes
      if (message.login) alert.success(message.login);
      if (message.register) alert.success(message.register);
      if (message.logout) alert.success(message.logout);
      if (message.createCourse) alert.success(message.createCourse);
      if (message.deleteCourse) alert.success(message.deleteCourse);
      if (message.editCourse) alert.success(message.editCourse);
      if (message.createAssignmentGroup)
        alert.success(message.createAssignmentGroup);
      if (message.deleteAssignmentGroup)
        alert.success(message.deleteAssignmentGroup);
      if (message.editAssignmentGroup)
        alert.success(message.editAssignmentGroup);
      if (message.createAssignment) alert.success(message.createAssignment);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert()(Alerts));
