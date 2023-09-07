import { useSelector } from 'react-redux';
import './Header.css';
import walletIcon from '../../assets/wallet-1-svgrepo-com.svg';
import moneyPieIcon from '../../assets/money-pie-chart-svgrepo-com.svg';
import userIcon from '../../assets/user-alt-1-svgrepo-com.svg';
import { ReduxState } from '../../types';

function Header() {
  const userEmail = useSelector((state: ReduxState) => state.user.email);
  const expenses = useSelector((state: ReduxState) => state.wallet.expenses);

  const totalExpense = expenses.reduce((total, expense) => {
    const exchangeRate = expense.exchangeRates[expense.currency];
    const value = Number(expense.value);
    const convertedValue = value * exchangeRate.ask;
    return total + convertedValue;
  }, 0);

  return (
    <header>
      <h1>
        <img src={ walletIcon } alt="Wallet icon" className="wallet-icon" />
        Virtual
        <span className="wallet-span">Wallet</span>
      </h1>
      <p className="expense-text">
        <img
          src={ moneyPieIcon }
          alt="Money pie icon"
          className="money-pie-icon"
        />
        <span className="total-expense-span">Despesa total:</span>
        {' '}
        <span className="price-span" data-testid="total-field">
          {totalExpense.toFixed(2)}
        </span>
        {' '}
        <span data-testid="header-currency-field">BRL</span>
      </p>
      <p data-testid="email-field" className="email-text">
        {' '}
        <img src={ userIcon } alt="User icon" className="user-icon" />
        {' '}
        <span className="email-span">Email:</span>
        {' '}
        {userEmail}
      </p>
    </header>
  );
}

export default Header;
