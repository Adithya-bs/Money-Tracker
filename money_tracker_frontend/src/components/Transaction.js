import { Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';

export default function TransactionCard({ id, title, price, date, note, handleDelete, openEditDialog }) {

    // adding '+' before positive values
    if (Number(price) > 0) {
        price = "+" + price;
    }



    return (
        <Card
            sx={{
                border: '1px dotted',
                borderColor: "text.disabled",
                borderRadius: '1px', mt: '-1px',
            }}
        >
            <CardContent
                sx={{
                    '&:last-child': {
                        padding: 2
                    }
                }}
            >
                <Box
                    className="content"
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column', // small screens
                            sm: 'row',    // medium and up screens
                        },
                    }}>

                    <Box className="col1"
                        sx={{

                            width: {
                                xs: '100%',  
                                sm: '50%',    
                            },
                        }}
                    >
                        {/* <div className="row1"> */}
                        <Typography variant='subtitle1' component="span" color="text.secondary">
                            {date}
                        </Typography>
                        <Typography variant='overline' sx={{ fontWeight: 'bold', fontSize: 15, ml: 5 }}>
                            {title}
                        </Typography>
                        <Typography variant='caption' component="div">
                            {note}
                        </Typography>
                        {/* </div> */}

                    </Box>

                    <Box className="col2"
                        sx={{

                            width: {
                                xs: '100%',   
                                sm: '40%', 
                            },
                        }}
                    >

                        <div>
                            <Typography
                                variant='h6'
                                sx={{
                                    color: Number(price) > 0 ? 'green' : 'red',
                                    mr: 3
                                }}
                            >
                                {price}
                            </Typography>
                        </div>


                        <Box>

                            <IconButton aria-label="edit" onClick={() => openEditDialog(id)}>
                                <EditIcon />
                            </IconButton>

                            <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
                                <DeleteIcon />
                            </IconButton>



                        </Box>
                    </Box>

                </Box>
            </CardContent>
        </Card >
    );
}