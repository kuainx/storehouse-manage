import { useState, useRef } from 'react';
import Item from '../Utils/Item';
import { Button } from '@mui/material';
import ErpDataGrid from './ErpDataGrid';
import ErpController from './ErpController';

export default function ErpSimulator() {
  const [erpDataList, setErpDataList] = useState([]);
  const erpDataRef = useRef([]);
  const addErpData = async data => {
    let id = erpDataRef.current.length + 1;
    const newData = data.map(e => ({ id: id++, ...e }));
    erpDataRef.current = [...newData.reverse(), ...erpDataRef.current];
    setErpDataList([...erpDataRef.current]);
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
        <ErpController addErpData={addErpData} />
      </Item>
    </>
  );
}
