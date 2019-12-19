import React from 'react';

import {Provider} from 'react-redux';
import store from './store';

import 'react-native-gesture-handler';

const App: () => React$Node = () => {
  return <Provider store={store}></Provider>;
};

export default App;
