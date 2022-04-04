import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Wallet.css';
import { fetchCurrency, fetchAll, Remove } from '../actions';

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

  removeClick = (id) => {
    const { removeDispatch } = this.props;
    removeDispatch(id);
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

    const filtro = expenses.map((el) => {
      const valor = el.value;
      const moeda = el.currency;
      const nomeMoedas = el.exchangeRates;
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
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  { (Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency]
                      .ask)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.removeClick(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>

        </table>
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
  removeDispatch: (stateId) => dispatch(Remove(stateId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencyDispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  appDadosDispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  removeDispatch: PropTypes.func.isRequired,
};
