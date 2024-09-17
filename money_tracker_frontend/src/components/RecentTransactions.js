import Box from '@mui/material/Box';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Transaction from './Transaction';
import dayjs from 'dayjs';
import deleteTransaction from './Delete';
import EditDialog from './EditDialog';
import { useState } from 'react';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import DeleteDialog from './ConfirmDeleteDialog';


const scrollToSection = (event, expanded) => {
    if (expanded) {
        event.target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

function TransactionsAccordian({ transactionsJSON, setSavedTransactions }) {


    const [transactionData, setTransactionData] = useState({});


    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = (id) => {
        setTransactionData(findTransactionById(id));
        setDeleteDialogOpen(true);
    }

    const agreeDelete = (id) => {
        deleteTransaction({ id, setSavedTransactions, transactionsJSON });
        setDeleteDialogOpen(false);
    }

    const [editDialogOpen, setEditDialogOpen] = useState(false);


    const findTransactionById = (id) => {
        return transactionsJSON.slice().find(transaction => transaction._id === id);
    };
    function openEditDialog(id) {
        setTransactionData(findTransactionById(id));
        setEditDialogOpen(true);
    }




    function updateTransaction() {

        axios.put(`${process.env.REACT_APP_UPDATE_TRANSACTION}${transactionData._id}`, transactionData)
            .then(response => {
                // console.log('Transaction updated:', response.data);
                enqueueSnackbar('Transaction Updated!', { variant: 'info' })
                const updatedTransactions = transactionsJSON.map(transaction =>
                    transaction._id === transactionData._id ? transactionData : transaction
                );

                setSavedTransactions(updatedTransactions);
            })
            .catch(error => {
                console.error('Error updating transaction:', error.response ? error.response.data : error.message);
            });
    }


    return (
        <>
            <Accordion

                onChange={scrollToSection}
                defaultExpanded
                sx={{
                    boxShadow: 0,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        padding: 0
                    }}
                >
                    <Typography color="text.primary" align="center">
                        Transactions
                    </Typography>

                </AccordionSummary>

                <AccordionDetails>

                    {transactionsJSON.slice().reverse().map((transaction) => {
                        const formattedDate = dayjs(transaction.date).format('DD/MM/YYYY');
                        return (
                            <Transaction
                                key={transaction._id}
                                id={transaction._id}
                                title={transaction.title}
                                price={transaction.price}
                                date={formattedDate}
                                note={transaction.note}
                                handleDelete={handleDelete}
                                openEditDialog={openEditDialog}
                            />)
                    })}



                </AccordionDetails>

            </Accordion>


            <EditDialog
                open={editDialogOpen}
                handleClose={() => setEditDialogOpen(false)}
                transactionData={transactionData}
                setTransactionData={setTransactionData}
                updateTransaction={updateTransaction}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                handleDisagree={() => setDeleteDialogOpen(false)}
                handleAgree={agreeDelete}
                transactionData={transactionData}
            />
        </>
    );
}


export default function RecentTransactions({ savedTransactions, setSavedTransactions }) {


    return (
        <Box
            position="relative"
            sx={{
                width: {
                    xs: '100%',   // 100% width for extra-small screens (mobile)
                    sm: '80%',    // 80% width for small screens (tablets)
                    md: '60%',    // 60% width for medium screens (small desktops)
                    lg: '35%',   // 40% width for large screens (larger desktops)
                },
                margin: 'auto',
                mt: 5
            }}>
            <div className="invisible"></div>
            <TransactionsAccordian transactionsJSON={savedTransactions} setSavedTransactions={setSavedTransactions} />

        </Box>
    )
};