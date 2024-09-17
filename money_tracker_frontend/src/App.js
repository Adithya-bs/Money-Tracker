import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import RecentTransactions from './components/RecentTransactions';
import TopBar from './components/TopBar';
import Balance from './components/Balance';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

function App() {

  const [savedTransactions, setSavedTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_ALL_TRANSACTIONS}`)
      .then(response => {
        // console.log(response);
        setSavedTransactions(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    let newBalance = savedTransactions.reduce((total, item) => total + parseFloat(item.price) || 0, 0);
    setBalance(newBalance);
  }, [savedTransactions]);

  
  return (
    <div className="App">
      <TopBar />
      <Balance balance={balance}/>
      <Form setSavedTransactions={setSavedTransactions} savedTransactions={savedTransactions} />
      <RecentTransactions savedTransactions={savedTransactions} setSavedTransactions={setSavedTransactions} />
      <SnackbarProvider maxSnack={3} />
    </div>
  );
}

export default App;
