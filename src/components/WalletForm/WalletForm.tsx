import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies, fetchExchangeRates } from '../../services';
import { saveCurrencies, saveExpense } from '../../redux/actions';
import { ExpenseType, ReduxState } from '../../types';
import './WalletForm.css';

const initialExpense = {
  id: 0,
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  exchangeRates: {},
};

function WalletForm() {
  const [expenses, setExpenses] = useState<ExpenseType>(initialExpense);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrencies = async () => {
      const fetchedCurrencies = await fetchCurrencies();
      dispatch(saveCurrencies(fetchedCurrencies));
    };
    getCurrencies();
  }, [dispatch]);

  const walletStore = useSelector((state: ReduxState) => state.wallet);
  const { currencies } = walletStore;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextId = walletStore.expenses.length;

    const currentExchangeRates = await fetchExchangeRates();
    console.log(currentExchangeRates);

    const newExpense: ExpenseType = {
      ...expenses,
      id: nextId,
      exchangeRates: currentExchangeRates,
    };
    dispatch(saveExpense(newExpense));

    setExpenses(initialExpense);
  };

  return (
    <form onSubmit={ handleFormSubmit } className="wallet-form">
      <label>
        Valor:
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ expenses.value }
          onChange={ handleInputChange }
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          maxLength={ 50 }
          data-testid="description-input"
          name="description"
          value={ expenses.description }
          onChange={ handleInputChange }
        />
      </label>
      <label>
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          value={ expenses.currency }
          onChange={ handleInputChange }
        >
          {currencies.map((currency) => (
            <option key={ currency } value={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <label>
        Método de pagamento:
        <select
          data-testid="method-input"
          name="method"
          value={ expenses.method }
          onChange={ handleInputChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label>
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          value={ expenses.tag }
          onChange={ handleInputChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button className="add-expense-button">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
