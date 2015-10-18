import React, { Component } from 'react';
import { closePreview } from '../../Actions/ActionCreators';
import BackButton from '../Shared/BackButton.jsx';
import Icon from '../Shared/Icon.jsx';
import Canvas from './Canvas.jsx';

export default class PreviewContainer extends Component {
  closePreviewWindow () {
    return closePreview();
  }

  render () {
    return (
      <div className='ab-preview'>
        <div className='ab-preview__controls'>
          <BackButton
            wrapperClassName={'ab-preview__close'}
            clickFunction={this.closePreviewWindow} />
          <div className='ab-preview__responsive'>
            <ul>
              <li><Icon name='monitor' /></li>
              <li><Icon name='phone' /></li>
            </ul>
          </div>
        </div>
        <Canvas />
      </div>
    )
  }
}