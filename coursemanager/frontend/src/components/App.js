import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// layout stuff
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";

// common stuff
import PrivateRoute from "./common/PrivateRoute";

// home stuff
import Home from "./home/Home";

// accounts stuff
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Profile from "./accounts/Profile";

// courses stuff
import Courses from "./courses/Courses";
import CreateCourse from "./courses/CreateCourse";
import Course from "./courses/Course";
import EditCourse from "./courses/EditCourse";

// assignments stuff
import Checkout from "./assignments/Checkout";
import AssignmentGroup from "./assignments/AssignmentGroup";
import EditAssignmentGroup from "./assignments/EditAssignmentGroup";
import InstructorAssignmentView from "./assignments/InstructorAssignmentView";
import StudentAssignmentView from "./assignments/StudentAssignmentView";
import EditAssignment from "./assignments/EditAssignment";

import Container from "react-bootstrap/Container";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// alert options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <Container>
                <Switch>
                  {/* home stuff */}
                  <Route exact path="/" component={Home} />

                  {/* auth stuff */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register/:token" component={Register} />
                  <Route exact path="/u/:username" component={Profile} />

                  {/* courses stuff */}
                  <PrivateRoute exact path="/courses" component={Courses} />
                  <PrivateRoute
                    exact
                    path="/courses/create"
                    component={CreateCourse}
                  />
                  <PrivateRoute
                    exact
                    path="/courses/:course/view"
                    component={Course}
                  />
                  <PrivateRoute
                    exact
                    path="/courses/:course/edit"
                    component={EditCourse}
                  />

                  {/* assignments stuff */}
                  <PrivateRoute exact path="/checkout" component={Checkout} />
                  <PrivateRoute
                    exact
                    path="/courses/:course/assignments/:group/view"
                    component={AssignmentGroup}
                  />
                  <PrivateRoute
                    exact
                    path="/courses/:course/assignments/:group/edit"
                    component={EditAssignmentGroup}
                  />
                  <PrivateRoute
                    exact
                    path="/courses/:course/assignments/:group/assignment/:assignment/iview"
                    component={InstructorAssignmentView}
                  />
                  <PrivateRoute
                    exact
                    path="/courses/:course/assignments/:group/assignment/:assignment/sview"
                    component={StudentAssignmentView}
                  />
                  <PrivateRoute
                    exact
                    path="/courses/:course/assignments/:group/assignment/:assignment/edit"
                    component={EditAssignment}
                  />
                </Switch>
              </Container>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
