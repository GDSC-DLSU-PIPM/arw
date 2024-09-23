import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../images/GDSC-Square.png';



const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <img src={logo} alt="Org Logo" style={{ marginRight: '16px', height: '40px', width: '40px' }} />
      <Typography variant="h6">GDSC-DLSU</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;