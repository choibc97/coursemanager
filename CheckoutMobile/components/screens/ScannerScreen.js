import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Container, Content, Text, Button} from 'native-base';

import QRCodeScanner from 'react-native-qrcode-scanner';

import {formatQrString, styles} from '../../actions/utility';
import {logout} from '../../actions/auth';
import {getStudentAssignment} from '../../actions/assignments';

export class ScannerScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    getStudentAssignment: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    title: 'Scanner',
  };

  state = {
    errDisplay: '',
  };

  onScan = e => {
    const qrString = e.data;
    const {student, assignment} = formatQrString(qrString);

    this.props.getStudentAssignment(student, assignment).then(res => {
      if (res) {
        this.props.navigation.navigate('Checkout');
      } else {
        this.setState({errDisplay: res});
      }
    });
  };

  onLogout = () => {
    this.props.logout();
  };

  render() {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('AuthLoading');
    }

    return (
      <Container>
        <Content>
          <QRCodeScanner
            onRead={this.onScan}
            reactivate
            reactivateTimeout={3000}
            showMarker
            topContent={<Text>Scan a student's QR code</Text>}
            bottomContent={<Text>{this.state.errDisplay}</Text>}
          />
          <Button style={styles.formButton} onPress={this.onLogout}>
            <Text style={styles.centerText}>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {logout, getStudentAssignment};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);
