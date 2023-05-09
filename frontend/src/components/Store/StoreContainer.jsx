import StoreSheet from './StoreSheet';
import Grid from '@mui/material/Grid';
import StoreShelf from './StoreShelf';
import StoreMachine from './StoreMachine';
import { useState } from 'react';
import { mobxObserver, useStores } from '../../store';

function StoreContainer() {
  const { materialStore } = useStores();
  console.log(materialStore.storeData);
  const [n, setN] = useState(0);
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div className='storeSheetContainer'>
          <StoreSheet n={n}></StoreSheet>
        </div>
      </Grid>
      <Grid item xs={4} className='storeStatusContainer'>
        <div className='storeShelfContainer'>
          {[...Array(8).keys()].map(index => (
            <StoreShelf key={index} n={index} changeN={() => setN(index)} />
          ))}
        </div>
        <div className='storeMachineContainer'>
          {[...Array(4).keys()].map(index => (
            <StoreMachine key={index} n={index} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}
export default mobxObserver(StoreContainer);
