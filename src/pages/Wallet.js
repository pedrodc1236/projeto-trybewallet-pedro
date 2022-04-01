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
      coins,
    } = this.props;
    console.log(coins);
    const {
      despesaTotal,
    } = this.state;
    return (
      <>
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
        <section>
          <label htmlFor="input-valor">
            Valor:
            <input
              data-testid="value-input"
              id="input-valor"
              type="number"
            />
          </label>
          <label htmlFor="coins">
            Moeda:
            <select id="coins">
              { coins.map((coin) => (
                <option key={ coin }>{ coin }</option>
              )) }
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select
              id="payment"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            <input
              data-testid="description-input"
              id="description"
              type="text"
            />
          </label>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  coins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyDispatch: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: Proptypes.string.isRequired,
  currencyDispatch: Proptypes.func.isRequired,
  coins: Proptypes.arrayOf.isRequired,
};
