import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Item from '../Utils/Item';
import { Button } from '@mui/material';

export default function ErpSimulator() {
  return (
    <>
      <Item>
        <Button variant='text'>ERP模拟器</Button>
      </Item>
      <Item>ERPERP</Item>
      <Item>
        <div className='simulatorControlContainer'>
          <TextField label='轮询时间(ms)' variant='outlined' />
          <FormControlLabel control={<Switch />} label='自动' />
        </div>
      </Item>
      <Item>
        <div className='simulatorControlContainer'>
          <TextField label='发送消息' variant='outlined' />
          <Button variant='contained'>发送</Button>
        </div>
      </Item>
    </>
  );
}
