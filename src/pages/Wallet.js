import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Wallet.css';
import { fetchCurrency, fetchAll, Remove, Edit } from '../actions';
import defaultState from '../defaultState';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  componentDidMount() {
    const { currencyDispatch } = this.props;
    currencyDispatch();
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleClick = () => {
    const { appDadosDispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    appDadosDispatch({ id, value, description, currency, method, tag });
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
    }));
  }

  editClick = (id) => {
    const { expenses } = this.props;
    const clickEdit = expenses.filter((expense) => expense.id === id);
    this.setState({
      id: clickEdit[0].id,
      value: clickEdit[0].value,
      description: clickEdit[0].description,
      currency: clickEdit[0].currency,
      method: clickEdit[0].method,
      tag: clickEdit[0].tag,
      change: true,
      exchangeRates: clickEdit[0].exchangeRates,
    });
  }

  editDespense = () => {
    const { editDispatch } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    editDispatch({ id, value, description, currency, method, tag, exchangeRates });
  }

  render() {
    const { userEmail, coins, expenses, removeDispatch } = this.props;
    const { value, description, currency, method, tag, change } = this.state;
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
              data-testid="currency-input"
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
          {
            change
              ? (
                <button
                  type="button"
                  onClick={ this.editDespense }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ () => this.handleClick() }
                >
                  Adicionar despesa
                </button>)
          }
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
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editClick(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => removeDispatch(expense.id) }
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
  editDispatch: (stateEdit) => dispatch(Edit(stateEdit)),
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
  editDispatch: PropTypes.func.isRequired,
};
