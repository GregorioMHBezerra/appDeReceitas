import React, { Component } from 'react';
import PropTypes from 'prop-types';

const teste = ['primeiro slide', 'segundo slide', 'terceiro slide'];

export default class Slide extends Component {
  render() {
    const { page } = this.props;
    return (
      <h1>{teste[page]}</h1>
    );
  }
}

Slide.propTypes = {
  nameState: PropTypes.string,
}.isRequired;
