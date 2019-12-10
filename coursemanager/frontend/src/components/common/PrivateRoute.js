import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { createMessage } from "../../actions/messages";

const PrivateRoute = ({
  component: Component,
  auth,
  createMessage,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          );
        } else if (!auth.isAuthenticated) {
          createMessage({
            privateRouteFail: "You must be logged in to access this page"
          });
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { createMessage };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
