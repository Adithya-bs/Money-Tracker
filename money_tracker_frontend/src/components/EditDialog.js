import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Date from './Date';
import dayjs from 'dayjs';


export default function EditDialog({ open, handleClose, transactionData, setTransactionData, updateTransaction }) {



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    updateTransaction();
                    handleClose();
                },
            }}
        >
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={transactionData.title}
                    onChange={(e) => setTransactionData({ ...transactionData, title: e.target.value })}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={transactionData.price}
                    onChange={(e) => setTransactionData({ ...transactionData, price: e.target.value })}
                />

                <Date
                    handleChange={(e) => setTransactionData({ ...transactionData, date: e.target.value })}
                    value={dayjs(transactionData.date)}
                />

                <TextField
                    margin="dense"
                    name="note"
                    label="Note"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={transactionData.note}
                    onChange={(e) => setTransactionData({ ...transactionData, note: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="info">Cancel</Button>
                <Button type="submit" color="success">Update</Button>
            </DialogActions>
        </Dialog>
    )
};

