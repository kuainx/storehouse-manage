import * as React from 'react';
import Box from '@mui/material/Box';
import Item from '../Utils/Item';

export default function SettingsContainer() {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
      style={{ marginTop: '-20px' }}
    >
      <Item>
        <iframe className='settingFrame' src='/api/admin'></iframe>
      </Item>
    </Box>
  );
}
