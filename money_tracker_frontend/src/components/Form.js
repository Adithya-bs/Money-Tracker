import { useState } from 'react';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Date from './Date';
import axios from 'axios';
import AlertDialog from './ConfirmAddDialog';
import { enqueueSnackbar } from 'notistack';


export default function Form({ setSavedTransactions, savedTransactions}) {


    let initialFormData = {
        price: '',
        title: '',
        details: '',
        date: dayjs(),
        note: '',
    };


    const [formData, setFormData] = useState(initialFormData);
    const [detailsError, setDetailsError] = useState(false);

    let changeForm = (event) => {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    // confirm dialog box state and functions
    const [open, setOpen] = useState(false);

 
    const openDialog = () => {
        setOpen(true);
    };

    const handleAgree = () => {
        const { details, ...clone } = formData;
        // console.log(clone.date);
        axios.post(`${process.env.REACT_APP_ADD_TRANSACTION}`, clone)
            .then(function (response) {
                // console.log(response.data);
                setFormData(initialFormData);
                
                setSavedTransactions([...savedTransactions, response.data]);
                enqueueSnackbar('Transaction added successfully!', { variant: 'success' });
            })
            .catch(function (error) {
                console.log(error);
            });

        setOpen(false);
    };


    const handleDisagree = () => {
        setOpen(false);
    };



    let validateDetails = () => {

        const regex = /^[+-]{0,1}(\d)+\s[a-zA-Z\s]+$/;
        const result = regex.test(formData.details);
        if (!result) {
            console.log("invalid transaction");
            setDetailsError(true);
            return false;
        }

        if (detailsError) setDetailsError(false);

        // extracting price and title from 'details' input field
        const index = formData.details.indexOf(' ');
        formData.price = formData.details.substring(0, index);
        formData.title = formData.details.substring(index + 1).trim();

        return true;
    }


    let handleSubmit = () => {
        if (!validateDetails()) return;
        openDialog();
    }


    return (
        <Box
            maxWidth="sm"
            component="form"
            autoComplete="off"
            className="mainContainer"
            sx={{
                width: { xs: '100%', sm: '80%', md: '60%' },
                borderRadius: 1,
                boxShadow: 3,
                border: '1px solid transparent',
                bgcolor: 'background.paper',
                p: 3,
            }}
        >


            <TextField
                name="details"
                value={formData.details}
                onChange={changeForm}
                error={detailsError}
                fullWidth
                required
                label="Details"
                helperText='Example : "-5000 Monitor"'
                inputProps={{ maxLength: 20 }} 

            />

            <div className="row">

                <Box>
                    <Date
                        handleChange={changeForm}
                        value={formData.date}
                    />

                </Box>

                <TextField
                    name="note"
                    value={formData.note}
                    onChange={changeForm}
                    placeholder="Note"
                    variant="outlined"
                    inputProps={{ maxLength: 40 }} 
                />

            </div>


            <Box
                sx={{
                    margin: '0 auto',
                    mt: 3
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Add Transaction
                </Button>
            </Box>

            <AlertDialog
                open={open}
                handleAgree={handleAgree}
                handleDisagree={handleDisagree}
                formData={formData}
            />
        </Box>
    )
};