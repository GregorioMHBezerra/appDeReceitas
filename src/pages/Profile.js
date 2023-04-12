import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUserOnStorage } from '../services/localStorage';

class Profile extends Component {
  getLocalStorageUSer = () => getUserOnStorage().email;

  logoutUser = () => {
    const { history } = this.props;

    history.push('/');
    localStorage.clear();
  };

  render() {
    const { history } = this.props;

    return (
      <>
        <Header title="Profile" history={ history } />

        <span
          data-testid="profile-email"
        >

          {this.getLocalStorageUSer()}
        </span>

        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }

        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => this.logoutUser() }
        >
          Logout
        </button>

        <Footer history={ history } />

      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Profile;

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
// Requisito 57- 62: Jéssica Pironato e Patrick Fonseca API Man;
