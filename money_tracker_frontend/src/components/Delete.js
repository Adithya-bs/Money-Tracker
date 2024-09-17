import { enqueueSnackbar } from 'notistack';
import axios from 'axios';

const deleteTransaction = async ({ id, setSavedTransactions, transactionsJSON }) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_DELETE_TRANSACTION}${id}`);
        setSavedTransactions(transactionsJSON.filter(transaction => transaction._id !== id));
        enqueueSnackbar('Transaction Deleted!', { variant: 'info' })
    } catch (error) {
        console.error('Failed to delete transaction:', error);
        throw error;
    }
};
export default deleteTransaction;