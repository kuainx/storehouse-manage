import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { mobxObserver, useStores } from '../../store';
function PollingSwitch() {
  const { runningStore } = useStores();
  return (
    <div style={{ marginLeft: 'auto' }}>
      <FormControlLabel
        control={
          <Switch checked={runningStore.polling} onChange={() => runningStore.togglePolling()} color='secondary' />
        }
        label='轮询数据'
      />
    </div>
  );
}
export default mobxObserver(PollingSwitch);
