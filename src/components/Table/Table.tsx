import { useDispatch, useSelector } from 'react-redux';
import './Table.css';
import trashBinIcon from '../../assets/bin-svgrepo-com.svg';
import { ReduxState } from '../../types';
import { deleteExpense } from '../../redux/actions';

function Table() {
  const expensesStore = useSelector((state: ReduxState) => state.wallet).expenses;
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    const newExpenses = expensesStore.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(newExpenses));
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="lighter-background blue-100-text">Descrição</th>
          <th>Tag</th>
          <th className="lighter-background blue-100-text">Método de pagamento</th>
          <th>Valor</th>
          <th className="lighter-background blue-100-text">Moeda</th>
          <th>Câmbio utilizado</th>
          <th className="lighter-background blue-100-text">Valor convertido</th>
          <th>Moeda de conversão</th>
          <th className="lighter-background">
            Editar/
            <span className="blue-100-text">Excluir</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {expensesStore.map((expense) => {
          const exchangeRateValue = Number(
            expense.exchangeRates[expense.currency].ask,
          );
          const convertedValue = (
            Number(expense.value) * Number(exchangeRateValue)
          ).toFixed(2);
          return (
            <tr key={ expense.id }>
              <td className="lighter-background">{expense.description}</td>
              <td>{expense.tag}</td>
              <td className="lighter-background">{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td className="lighter-background">
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td>{exchangeRateValue.toFixed(2)}</td>
              <td className="lighter-background">{convertedValue}</td>
              <td>Real</td>
              <td className="lighter-background">
                <button
                  data-testid="delete-btn"
                  onClick={ () => handleDelete(expense.id) }
                  className="delete-button"
                >
                  <img
                    src={ trashBinIcon }
                    alt="Trash bin icon"
                    className="trash-bin-icon"
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
