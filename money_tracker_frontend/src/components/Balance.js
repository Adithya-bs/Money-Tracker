import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

function Balance({ balance }) {
    const color = balance >= 0 ? 'green' : 'red';
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '100vh', // Full viewport height
                bgcolor: 'background.default',
                marginTop: '5vh',
            }}
        >
            <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        Current Balance
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ color: color }}>
                        ₹{balance}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Balance;
