import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import classNames from 'classnames';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import BackButton from '../Shared/BackButton';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';

class SideTab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  closeSidetab () {
    return closeSidetab();
  }

  render () {
    const { dispatch, data, builderConfiguration, theme, localization } = this.props;

    this.childrenToRender = proccessChildrenData(data);

    return (
      <div 
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <div className='ab-sidetab__wrapper'>
          <BackButton clickFunction={this.closeSidetab} />
          <h1>{getString(data.title)}
            <span>{getString(data.subtitle)}</span>
          </h1>
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, theme, localization, builderConfiguration, dispatch, i);
            }) : false
          }
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    localization: state.localization,
    theme: state.theme
  };
}

export default connect(
  mapStateToProps
)(SideTab);