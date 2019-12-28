import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Container, Content, Spinner} from 'native-base';
import {SafeAreaView, ActivityIndicator} from 'react-native';

import {loadUser} from '../../actions/auth';

export class AuthLoadingScreen extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {isLoading, isAuthenticated} = this.props.auth;

    if (!isLoading) {
      this.props.navigation.navigate(isAuthenticated ? 'Instructor' : 'Login');
    }

    return (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {loadUser};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
