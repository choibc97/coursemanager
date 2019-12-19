import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import QRCodeScanner from 'react-native-qrcode-scanner';

export class ScannerScreen extends Component {
  static propTypes = {};

  render() {
    return <></>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);
