import { useState } from 'react';
import Item from '../Utils/Item';
import { Button } from '@mui/material';
import PlcDataGrid from './PlcDataGrid';
import PlcController from './PlcController';

export default function PlcSimulator() {
  const [plcDataList, setPlcDataList] = useState([]);
  const addPlcData = data => {
    let id = plcDataList.length + 1;
    const newData = data.map(e => ({ id: id++, ...e }));
    setPlcDataList([...newData.reverse(), ...plcDataList]);
  };
  return (
    <>
      <Item>
        <Button variant='text'>PLC模拟器</Button>
      </Item>
      <Item style={{ height: 'calc(100vh - 450px)' }}>
        <PlcDataGrid data={plcDataList} />
      </Item>
      <Item>
        <PlcController addPlcData={addPlcData} />
      </Item>
    </>
  );
}
