import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserOnStorage } from '../services/localStorage';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onClickSettings = () => {
    const { history } = this.props;
    history.push('/meals');
  };

  // apresentacao = () => {
  //   const { history } = this.props;
  //   history.push('/apresentacao');
  // };

  onClickHandler = async () => {
    // const { dispatch } = this.props;
    const { email } = this.state;
    // dispatch(updatePersonalInfo(this.state));
    // const token = await fecthToken();
    setUserOnStorage({ email });
    // if (email === 'adm@apresentacao.com') {
    //   this.apresentacao();
    // } else {
    this.onClickSettings();
    // }
  };

  handleChange = ({ target }) => {
    const { state } = this;
    const { name, value } = target;
    // const result = target.type === 'checkbox' ? target.checked : value;
    this.setState({
      ...state,
      [name]: value,
    });
  };

  // const saveToLocalStorage = (dataInfo) => {
  //   dataInfo.forEach(()=> )
  // };

  render() {
    // Lembrar de recolocar a validação
    const { password, email } = this.state;

    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    // const regex = /[a-z0-9]/i;
    const passwordMinSize = 7;

    return (
      <form className="container-login">
        <h1>App de Receitas</h1>
        <fieldset className="inputs-login">
          <legend> Usuário </legend>
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Password"
            data-testid="password-input"
          />
        </fieldset>
        <div className="buttons-login">
          <button
            className="button-login"
            type="button"
            disabled={ !(regex.test(email) && password.length >= passwordMinSize) }
            onClick={ this.onClickHandler }
            data-testid="login-submit-btn"
          >
            Enter
          </button>

        </div>
      </form>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
// Requisito 8-9: Patrick Fonseca, Jéssica Pironato
