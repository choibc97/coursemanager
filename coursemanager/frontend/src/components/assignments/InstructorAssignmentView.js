import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class InstructorAssignmentView extends Component {
  static propTypes = {};

  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructorAssignmentView);
