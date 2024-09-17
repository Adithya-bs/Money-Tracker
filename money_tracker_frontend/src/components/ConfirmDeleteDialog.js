import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

export default function DeleteDialog({ open, handleAgree, handleDisagree, transactionData }) {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this transaction?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography> <b>Title : </b>{transactionData.title}</Typography>

                        <Typography> <b>Amount : </b>{transactionData.price}</Typography>

                        <Typography><b>Date : </b>{dayjs(transactionData.date).format('DD/MM/YYYY')}</Typography>

                        <Typography> <b>Note : </b>{transactionData.note}</Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="info">Cancel</Button>
                    <Button onClick={() => handleAgree(transactionData._id)} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}