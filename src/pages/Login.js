import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      disabledBtn: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleDisabled);
  }

  validationInput = (inputEmail) => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (inputEmail.match(mailformat)) {
      return true;
    }
  }

  handleDisabled = () => {
    const { email, senha } = this.state;
    const minLengthPassword = 6;
    if (this.validationInput(email) && senha.length >= minLengthPassword) {
      this.setState({
        disabledBtn: false,
      });
    } else {
      this.setState({
        disabledBtn: true,
      });
    }
  }

  handleClick = () => {
    const { dispatchEmail, history } = this.props;
    const { email } = this.state;
    dispatchEmail(email);

    history.push('/carteira');
  }

  render() {
    const {
      email,
      senha,
      disabledBtn,
    } = this.state;
    return (
      <form className="form">
        <fieldset className="login">
          <h3>TrybeWallet</h3>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="email-input"
              id="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha-input">
            Senha:
            <input
              data-testid="password-input"
              id="senha-input"
              type="password"
              name="senha"
              value={ senha }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ disabledBtn }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  dispatchEmail: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
