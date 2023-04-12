import React, { Component } from 'react';
import Slide from '../components/Slide';
// import PropTypes from 'prop-types';

const slideMax = 3;

export default class Apresentacao extends Component {
  state = {
    page: 0,
  };

  nextPage = () => {
    const { page } = this.state;
    if (page <= slideMax) {
      this.setState((i) => ({ page: i.page + 1 }));
    }
  };

  prevPage = () => {
    const { page } = this.state;
    if (page > 0) {
      this.setState((i) => ({ page: i.page - 1 }));
    }
  };

  render() {
    const { page } = this.state;
    return (
      <section>
        <Slide page={ page } />
        <button
          type="button"
          onClick={ () => this.prevPage() }
        >
          anterior
        </button>

        <button
          type="button"
          onClick={ () => this.nextPage() }
        >
          próximo
        </button>

      </section>
    );
  }
}

// Apresentacao.propTypes = {
//   nameState: PropTypes.string,
// }.isRequired;
