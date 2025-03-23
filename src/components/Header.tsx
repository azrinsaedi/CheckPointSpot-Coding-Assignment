import React from 'react';
import { AppBar, Toolbar, Typography, FormControlLabel, Switch, Box } from '@mui/material';

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Box component='img' src='/icon.svg' alt='Task Manager Logo' sx={{ width: 40, height: 40, mr: 2 }} />
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <FormControlLabel control={<Switch checked={darkMode} onChange={toggleDarkMode} />} label='Dark Mode' />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
