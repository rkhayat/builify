import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeTab, openSidetab } from '../../Actions/ActionCreators';
import { randomKey } from '../../Common/Common';
import classNames from 'classnames';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender.jsx';
import BackButton from '../Shared/BackButton.jsx';
import Scrollbar from '../Shared/Scrollbar.jsx';

class Tab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object,
    targetIndex: PropTypes.number
  }

  static defaultProps = {
    data: {},
    targetIndex: 0
  }

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  }

  closeTab (e) {
    return closeTab();
  }

  render () {
    const { dispatch, data, builderConfiguration, theme, localization, targetIndex, builder } = this.props;
    const scrollbarKey = randomKey();

    this.childrenToRender = proccessChildrenData(data);

    return (
      <div
        className='ab-tab'
        data-target={targetIndex}>
        <Scrollbar key={scrollbarKey}>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, theme, localization, builderConfiguration, dispatch, builder, i);
            }) : false
          }
        </Scrollbar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localizationData,
    theme: state.theme
  }
}

export default connect(
  mapStateToProps
)(Tab);