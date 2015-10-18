import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../Actions/ActionCreators';
import Base from './Base.jsx';
import configureStore from '../Store/ConfigureStore';

export const store = configureStore();
store.dispatch(runApplicationActions());

export class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Base />
      </Provider>
    )
  }
}