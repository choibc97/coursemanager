import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
} from 'native-base';

import {styles} from '../../actions/utility';
import {login} from '../../actions/auth';

export class LoginScreen extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  onEmailChange = email => {
    this.setState({email: email});
  };

  onPasswordChange = password => {
    this.setState({password: password});
  };

  onLogin = () => {
    const {email, password} = this.state;

    this.props.login(email, password);
  };

  render() {
    const {isAuthenticated} = this.props.auth;

    if (isAuthenticated) {
      this.props.navigation.navigate('Instructor');
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Login</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>WUSTL Email</Label>
              <Input
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={this.onEmailChange}
                value={this.state.email}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                textContentType="password"
                secureTextEntry
                onChangeText={this.onPasswordChange}
                value={this.state.password}
              />
            </Item>
            <Button style={styles.formButton} onPress={this.onLogin}>
              <Text style={styles.centerText}>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
