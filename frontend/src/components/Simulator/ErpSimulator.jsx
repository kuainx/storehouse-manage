import { useState } from 'react';

import Item from '../Utils/Item';
import { Button } from '@mui/material';
import ErpDataGrid from './ErpDataGrid';
import ErpController from './ErpController';

export default function ErpSimulator() {
  const [erpDataList, setErpDataList] = useState([]);
  const addErpData = data => {
    let id = erpDataList.length + 1;
    const newData = data.map(e => ({ id: id++, ...e }));
    setErpDataList([...newData.reverse(), ...erpDataList]);
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
