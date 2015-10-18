import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocationEnum } from '../Constants/Defines';
import { addNotification } from '../Actions/ActionCreators';
import classNames from 'classnames';
import Aside from './Aside/Aside.jsx';
import Main from './Main/Main.jsx';
import NotificationContainer from './Notifications/NotificationContainer.jsx';
import LoadingScreen from './Shared/LoadingScreen.jsx';
import ColorPicker from './Shared/ColorPicker.jsx';

class Base extends Component {
  render () {
    const { builder, builderConfiguration} = this.props;
    const { currentLocation } = builder;
    const { defaultTheme } = builderConfiguration;
    const reactWrapClassname = classNames('react-wrap', defaultTheme, currentLocation === CurrentLocationEnum.PREVIEW ? 'preview' : '');
    const asideClassName = currentLocation === CurrentLocationEnum.PREVIEW ? 'hidden' : '';

    let colorCss = {
      position: 'fixed',
      top: '0',
      left: '275px',
      marginLeft: '0'
    };

    return (
      <div className={reactWrapClassname}>
        <LoadingScreen />
        <Aside cName={asideClassName} />
        <Main />
        <ColorPicker />
        <NotificationContainer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(Base);