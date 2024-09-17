import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <AccountBalanceWalletIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Money Tracker
        </Typography>
        {/* <Box sx={{ ml: 2 }}>
          <Typography variant="h6" component="div">
            ${balance}
          </Typography> */}
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
