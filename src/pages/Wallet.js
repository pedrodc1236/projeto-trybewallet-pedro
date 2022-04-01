import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      despesaTotal: 0,
    };
  }

  render() {
    const {
      userEmail,
    } = this.props;
    const {
      despesaTotal,
    } = this.state;
    console.log(userEmail);
    return (
      <header>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">{ `R$ ${despesaTotal}` }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  userEmail: Proptypes.string.isRequired,
};
