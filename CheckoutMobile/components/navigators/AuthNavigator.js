import React from 'react';
import {createSwitchNavigator} from 'react-navigation';

import InstructorNavigator from './InstructorNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';

export default AuthNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Login: LoginScreen,
  Instructor: InstructorNavigator,
});
