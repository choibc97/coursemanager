import React, {Component} from 'react';

import {Provider} from 'react-redux';
import store from './store';

import {createAppContainer} from 'react-navigation';
import AuthNavigator from './components/navigators/AuthNavigator';

import {Root} from 'native-base';

import Alerts from './components/layout/Alerts';

const AppContainer = createAppContainer(AuthNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Alerts />
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
