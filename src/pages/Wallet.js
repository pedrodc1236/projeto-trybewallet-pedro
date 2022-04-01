import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './Wallet.css';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      despesaTotal: 0,
    };
  }

  componentDidMount() {
    const { currencyDispatch } = this.props;
    currencyDispatch();
  }

  render() {
    const {
      userEmail,
    } = this.props;
    const {
      despesaTotal,
    } = this.state;
    return (
      <header className="header">
        <img
          className="img-trybe"
          src="https://www.abcdacomunicacao.com.br/wp-content/uploads/Trybe_logo-baixa.png"
          alt="img"
        />
        <div className="header-div">
          <p data-testid="email-field">{ `Email: ${userEmail} ` }</p>
          <p data-testid="total-field">{ `R$ ${despesaTotal}` }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  currencyDispatch: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: Proptypes.string.isRequired,
  currencyDispatch: Proptypes.func.isRequired,
};
