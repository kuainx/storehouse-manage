import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Item from '../Utils/Item';
import { Button } from '@mui/material';
import ErpDataGrid from './ErpDataGrid';
import { useState } from 'react';
import { getTimeText } from '../../controller/utils';

export default function ErpSimulator() {
  const [erpDataList, setErpDataList] = useState([
    { id: 2, send: false, type: 0, material: '<1-2-3>', task: 13, time: getTimeText() },
    { id: 1, send: true, type: 0, material: 'LJ50（30个/盒）', task: -1, time: getTimeText() },
  ]);
  const addErpData = data => {
    setErpDataList([{ id: erpDataList.length + 1, ...data }, ...erpDataList]);
  };
  return (
    <>
      <Item>
        <Button variant='text'>ERP模拟器</Button>
      </Item>
      <Item style={{ height: 'calc(100vh - 450px)' }}>
        <ErpDataGrid data={erpDataList} />
      </Item>
      <Item>
        <div className='simulatorControlContainer'>
          <TextField label='轮询时间(ms)' variant='outlined' />
          <FormControlLabel control={<Switch />} label='自动' />
        </div>
      </Item>
      <Item>
        <div className='simulatorControlContainer'>
          <TextField label='发送消息' variant='outlined' />
          <Button
            variant='contained'
            onClick={() => addErpData({ send: false, type: 0, material: '<1-2-3>', task: 13, time: getTimeText() })}
          >
            发送
          </Button>
        </div>
      </Item>
    </>
  );
}
