// This code is taken from: https://github.com/bvaughn/react-highlight.js/blob/master/src/Highlight.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import highlight from 'highlight.js'

export default class Highlight extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    language: PropTypes.string,
    style: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.codeRef = React.createRef();
  }

  componentDidMount () {
    highlight.highlightBlock(findDOMNode(this.codeRef.current))
  }

  componentDidUpdate () {
    highlight.initHighlighting.called = false
    highlight.highlightBlock(findDOMNode(this.codeRef.current))
  }

  render () {
    const { children, className, language, style } = this.props

    return (
      <pre
        className={className}
        style={style}
      >
        <code
          className={language}
          ref={this.codeRef}
        >
          {children}
        </code>
      </pre>
    )
  }
}