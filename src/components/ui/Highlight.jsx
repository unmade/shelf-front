// This code is taken from: https://github.com/bvaughn/react-highlight.js/blob/master/src/Highlight.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import highlight from 'highlight.js';

export default class Highlight extends Component {
  constructor(props) {
    super(props);
    this.codeRef = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    highlight.highlightBlock(findDOMNode(this.codeRef.current));
  }

  componentDidUpdate() {
    highlight.initHighlighting.called = false;
    // eslint-disable-next-line react/no-find-dom-node
    highlight.highlightBlock(findDOMNode(this.codeRef.current));
  }

  render() {
    const { children, className, language } = this.props;

    return (
      <pre className={className}>
        <code className={language} ref={this.codeRef}>
          {children}
        </code>
      </pre>
    );
  }
}

Highlight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  language: PropTypes.string,
};

Highlight.defaultProps = {
  className: '',
  language: undefined,
};
