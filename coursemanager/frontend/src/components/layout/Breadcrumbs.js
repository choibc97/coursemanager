import React, { Component } from "react";
import PropTypes from "prop-types";

import Breadcrumb from "react-bootstrap/Breadcrumb";

import {
  makePathArray,
  makePathString,
  capitalize,
  pathExclusions
} from "../../actions/utility";

export default class Breadcrumbs extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired
  };

  render() {
    const pathArray = makePathArray(this.props.path);

    return (
      <Breadcrumb>
        {pathArray.map((path, i, arr) => (
          <Breadcrumb.Item
            key={path}
            active={pathExclusions.has(path) || i === pathArray.length - 1}
            href={makePathString(arr, i)}
          >
            {capitalize(path)}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}
