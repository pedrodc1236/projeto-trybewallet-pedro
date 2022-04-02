import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Wallet.css';
import { fetchCurrency, fetchAll } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { currencyDispatch } = this.props;
    currencyDispatch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { appDadosDispatch } = this.props;
    appDadosDispatch(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
    }));
  }

  render() {
    const {
      userEmail,
      coins,
      expenses,
    } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    console.log(expenses);

    const filtro = expenses.map((el) => {
      const valor = el.value;
      const moeda = el.currency;
      const nomeMoedas = el.exchangeRates;
      console.log(nomeMoedas[moeda]);
      const obj = {
        value: valor,
        moedaInd: nomeMoedas[moeda].ask,
        nameInd: nomeMoedas[moeda].name,
      };
      return obj;
    });

    const mult = filtro.map((element) => Number((element.value * element.moedaInd)));

    const total = mult.reduce((acc, el) => acc + el, 0);

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
            <p data-testid="total-field">{ total.toFixed(2) }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <section>
          <label htmlFor="input-valor">
            Valor:
            <input
              data-testid="value-input"
              id="input-valor"
              name="value"
              value={ value }
              type="number"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="coins">
            Moeda:
            <select
              id="coins"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { coins.map((coin) => (
                <option
                  key={ coin }
                  value={ coin }
                >
                  { coin }
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select
              id="payment"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
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
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            onClick={ () => this.handleClick() }
          >
            Adicionar despesa
          </button>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencyDispatch: () => dispatch(fetchCurrency()),
  appDadosDispatch: (state) => dispatch(fetchAll(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencyDispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  appDadosDispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ).isRequired,
};
