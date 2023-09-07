import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import WalletForm from '../../components/WalletForm/WalletForm';
import './Wallet.css';

function Wallet() {
  return (
    <div>
      <Header />
      <main className="main-wallet-content">
        <WalletForm />
        <Table />
      </main>
    </div>
  );
}

export default Wallet;
