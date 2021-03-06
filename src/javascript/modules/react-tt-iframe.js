import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode, unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from 'react-dom';
import {
  assign as _assign,
  omit as _omit
} from 'lodash';

export default class IFrame extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    head: PropTypes.node,
    initialContent: PropTypes.string,
    mountTarget: PropTypes.string,
    contentDidMount: PropTypes.func,
    contentDidUpdate: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    initialContent: '<!DOCTYPE html><html><head></head><body><div></div></body></html>',
    contentDidMount: function () {},
    contentDidUpdate: function () {}
  };

  _isMounted = false;
  _document = null;
  _node = null;

  render () {
    const props = _omit(this.props, [
      'contentDidMount',
      'contentDidUpdate',
      'initialContent'
    ]);

    return React.createElement('iframe', _assign({}, props, { children: undefined }));
  }

  componentDidMount () {
    this._isMounted = true;
    this.renderFrameContents();
  }

  renderFrameContents() {
    if (!this._isMounted) {
      return;
    }

    var doc = findDOMNode(this).contentDocument;

    if (doc && doc.readyState === 'complete') {
      var contents = React.createElement('div',
        { 'data-ttroot': true },
        this.props.head,
        this.props.children
      );

      var initialRender = !this._setInitialContent;

      if (!this._setInitialContent) {
        doc.open();
        doc.write(this.props.initialContent);
        doc.close();
        this._setInitialContent = true;
      }

      // unstable_renderSubtreeIntoContainer allows us to pass this component as
      // the parent, which exposes context to any child components.
      var mountTarget;

      const callback = () => {
        if (initialRender) {
          this.props.contentDidMount(doc);
        } else {
          this.props.contentDidUpdate(doc);
        }
      };

      if (this.props.mountTarget) {
        mountTarget = doc.querySelector(this.props.mountTarget);
      } else {
        mountTarget = doc.body.children[0];
      }

      unstable_renderSubtreeIntoContainer(this, contents, mountTarget, callback);

      this._document = doc;
    } else {
      setTimeout(::this.renderFrameContents, 0);
    }
  }

  componentDidUpdate () {
    this.renderFrameContents();
  }

  componentWillUnmount () {
    const iframe = findDOMNode(this);
    const doc = iframe.contentDocument;

    this._isMounted = false;

    if (doc) {
      unmountComponentAtNode(doc.body);
    }
  }
}
