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
import Profile from "./accounts/Profile";

// courses stuff
import Courses from "./courses/Courses";

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
                  {/* auth stuff */}
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/u/:username" component={Profile} />

                  {/* courses stuff */}
                  <PrivateRoute exact path="/courses" component={Courses} />
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
