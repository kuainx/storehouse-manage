import StoreSheet from './StoreSheet';
import Grid from '@mui/material/Grid';
import StoreShelf from './StoreShelf';
import StoreMachine from './StoreMachine';
import { useState } from 'react';
import { mobxObserver, useStores } from '../../store';
import { CircularProgress } from '@mui/material';

function StoreContainer() {
  const { materialStore, runningStore } = useStores();
  const [n, setN] = useState(0);
  const settings = runningStore.settings;
  if (!settings.storen || !materialStore.storeData) {
    return <CircularProgress disableShrink />;
  }
  const sn = parseInt(settings.storen);
  const sy = parseInt(settings.storey);
  const sx = parseInt(settings.storex);
  const total = sy * sx;
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div className='storeSheetContainer'>
          <StoreSheet n={n} sy={sy} sx={sx}></StoreSheet>
        </div>
      </Grid>
      <Grid item xs={4} className='storeStatusContainer'>
        <div className='storeShelfContainer'>
          {[...Array(sn * 2).keys()].map(index => (
            <StoreShelf key={index} n={index} changeN={() => setN(index)} total={total} />
          ))}
        </div>
        <div className='storeMachineContainer'>
          {[...Array(sn).keys()].map(index => (
            <StoreMachine key={index} n={index} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}
export default mobxObserver(StoreContainer);
