import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterRecipes, clearState } from '../redux/actions';
import { apiRequestCategory, apiRequestFiltered } from '../services/coffeAndBread';
import { idPathname } from '../tests/utils/helpers';

class CategoryButtons extends Component {
  state = {
    request: [],
  };

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const request = await apiRequestCategory(pathname);
    this.setState({
      request,
    });
  }

  apiFiltered = async (filter) => {
    const { history: { location: { pathname } }, dispatch } = this.props;
    const { foodOrDrink } = idPathname(pathname);
    const result = await apiRequestFiltered(pathname, filter);
    dispatch(filterRecipes(result[foodOrDrink]));
  };

  render() {
    const { dispatch, apiResultFilter } = this.props;
    const { request } = this.state;
    const numberOfCategories = 5;
    return (
      <section>
        {
          (request.length > 0) ? (
            <nav>
              <button
                data-testid="All-category-filter"
                onClick={ () => dispatch(filterRecipes('')) }
              >
                All
              </button>

              {request.map(({ strCategory }, index) => {
                if (index < numberOfCategories) {
                  return (
                    <button
                      key={ index }
                      data-testid={ `${strCategory}-category-filter` }
                      onClick={ () => (apiResultFilter.length === 0
                        ? this.apiFiltered(strCategory)
                        : dispatch(clearState('apiResultFilter'))) }
                    >
                      { strCategory }
                    </button>
                  );
                }
                return null;
              })}
            </nav>
          ) : <p> Loading...</p>

        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  apiResultFilter: state.filterReducer.apiResultFilter,
});

CategoryButtons.propTypes = {
  history: PropTypes.string,
  apiRequest: PropTypes.arrayOf(PropTypes.shape({
    strCategory: PropTypes.string,
  })).isRequired,
}.isRequired;

export default connect(mapStateToProps)(CategoryButtons);
