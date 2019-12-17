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
import About from "./home/About";

// accounts stuff
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Profile from "./accounts/Profile";

// courses stuff
import Courses from "./courses/Courses";
import CreateCourse from "./courses/CreateCourse";
import Course from "./courses/Course";
import EditCourse from "./courses/EditCourse";

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
                  <Route exact path="/about" component={About} />

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
