import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';


export default function AlertDialog({ open, handleAgree, handleDisagree, formData }) {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to add this transaction?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography> <b>Title : </b>{formData.title}</Typography>

                        <Typography> <b>Amount : </b>{formData.price}</Typography>

                        <Typography><b>Date : </b>{formData.date.format('DD/MM/YYYY')}</Typography>

                        <Typography> <b>Note : </b>{formData.note}</Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="error">Cancel</Button>
                    <Button onClick={handleAgree} color="success" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}