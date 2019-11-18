import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// import Header from "./layout/Header";
// import Alerts from "./layout/Alerts";
// import Login from "./accounts/Login";
// import Register from "./accounts/Register";
// import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
// import { loadUser } from "../actions/auth";

// alert options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    // store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              {/* <Header />
              <Alerts /> */}
              <div className="container">
                <Switch>
                  {/* <Route exact path="/" component={Home} /> */}
                  {/* <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} /> */}
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
