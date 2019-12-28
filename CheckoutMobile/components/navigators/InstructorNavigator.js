import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import ScannerScreen from '../screens/ScannerScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

export default InstructorNavigator = createStackNavigator({
  Scanner: ScannerScreen,
  Checkout: CheckoutScreen,
});
