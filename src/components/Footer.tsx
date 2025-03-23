import React from 'react';
import { Box, Typography } from '@mui/material';
import { FooterProps } from '../types';

const Footer: React.FC<FooterProps> = ({ taskCount }) => {
  return (
    <Box textAlign='center' p={2} mt={4} component='footer'>
      <Typography variant='body1' color='textSecondary'>
        {taskCount} {taskCount === 1 ? 'task' : 'tasks'} total
      </Typography>
    </Box>
  );
};

export default Footer;
