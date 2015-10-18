import React, { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import LoadingIcon from './LoadingIcon.jsx';

class LoadingScreen extends Component {
  render () {
    const { builder } = this.props;
    const { isLoadingScreenActive, loadingScreenType } = builder;

    if (loadingScreenType === 0) {
      const loadingScreenClassName = className('ab-loadingScreen', isLoadingScreenActive ? 'show' : '');

      return (
        <div className={loadingScreenClassName}>
          <LoadingIcon />
          <div className="ab-loadingScreen__loading">Loading builder</div>
          <div className="ab-loadingScreen__info">Please wait...</div>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(LoadingScreen);