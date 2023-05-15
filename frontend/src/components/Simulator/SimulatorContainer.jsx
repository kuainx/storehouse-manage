import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Item from '../Utils/Item';
import ErpSimulator from './ErpSimulator';
import PlcSimulator from './PLCSimulator';

export default function SimulatorContainer() {
  return (
    <Box sx={{ flexGrow: 1, width: '80vw' }}>
      <Grid container spacing={2}>
        <Grid item xs={6} className='simulatorContainer'>
          <ErpSimulator />
        </Grid>
        <Grid item xs={6} className='simulatorContainer'>
          <PlcSimulator />
        </Grid>
      </Grid>
    </Box>
  );
}
