import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigators from './navigator/AppNavigators';

import store from './store';

export default class App extends Component {
  render() {
    /**
     * 将store传递给整个app框架
     */
    return (
      <Provider store={store}>
        <AppNavigators />
      </Provider>
    );
  }
}
