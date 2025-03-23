import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTaskContext } from '../context/useTaskContext';

const Footer: React.FC = () => {
  const { filteredTasks } = useTaskContext();
  return (
    <Box textAlign='center' p={2} mt={4} component='footer'>
      <Typography variant='body1' color='textSecondary'>
        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} total
      </Typography>
    </Box>
  );
};

export default Footer;
