import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Item from '../Utils/Item';

export default function SimulatorContainer() {
  return (
    <Box sx={{ flexGrow: 1, width: '80vw' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <div className='simulatorControlContainer'>
              <TextField label='轮询时间(ms)' variant='outlined' />
              <FormControlLabel control={<Switch />} label='ERP模拟器' />
            </div>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <div className='simulatorControlContainer'>
              <TextField label='轮询时间(ms)' variant='outlined' />
              <FormControlLabel control={<Switch />} label='PLC模拟器' />
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
