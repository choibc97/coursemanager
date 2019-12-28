import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Toast} from 'native-base';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {error, message} = this.props;

    if (error !== prevProps.error) {
      if (error.status === 401 || error.status === 403)
        Toast.show({
          text: `${error.msg.detail}`,
          buttonText: 'OK',
          type: 'danger',
          duration: 3000,
        });
      if (error.status === 500)
        Toast.show({
          text: 'There is a problem with your request.',
          buttonText: 'OK',
          type: 'danger',
          duration: 3000,
        });

      if (error.msg.non_field_errors)
        Toast.show({
          text: `${error.msg.non_field_errors.join(', ')}`,
          buttonText: 'OK',
          type: 'danger',
          duration: 3000,
        });
    }

    if (message !== prevProps.message) {
      // successes
      if (message.login)
        Toast.show({
          text: message.login,
          buttonText: 'OK',
          type: 'success',
          duration: 3000,
        });
      if (message.logout)
        Toast.show({
          text: message.logout,
          buttonText: 'OK',
          type: 'success',
          duration: 3000,
        });
      if (message.editStudentAssignment)
        Toast.show({
          text: message.editStudentAssignment,
          buttonText: 'OK',
          type: 'success',
          duration: 3000,
        });
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
