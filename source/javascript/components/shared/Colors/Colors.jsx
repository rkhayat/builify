import React from 'react';
import Random from '../../../common/random';
import _map from 'lodash/map';
import Color from './color';
import { connect } from 'react-redux';
import { openColorPicker } from '../../../Actions';

class Colors extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  clickColor (element) {
    return this.props.openColorPicker(element);
  }

  renderColors () {
    const { template } = this.props;
    const { design } = template;
    const { colors } = design;

    return _map(colors, (color, colorTarget) => {
      const key = Random.randomKey('color');

      return (
        <Color
         key={key}
         color={color}
         colorTarget={colorTarget}
         onClick={::this.clickColor} />
      );
    });
  }

  render () {
    return (
      <div>
        { this.renderColors() }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openColorPicker: (target) => {
      dispatch(openColorPicker(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Colors);
