import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";

import store from "./store";

import StudentNavigator from "./components/navigators/StudentNavigator";
import InstructorNavigator from "./components/navigators/InstructorNavigator";

const AppContainer = createAppContainer(InstructorNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}><AppContainer /></Provider>
    );
  }
}
