import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mobxObserver, useStores } from '../../store';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StoreInfoCard() {
  const { runningStore, materialStore } = useStores();
  const navigate = useNavigate();
  const settings = runningStore.settings;
  const storeRaw = materialStore.storeRaw;
  if (!settings.storen || storeRaw.length === 0) {
    return <CircularProgress disableShrink />;
  }
  const sn = parseInt(settings.storen);
  const sy = parseInt(settings.storey);
  const sx = parseInt(settings.storex);
  const total = 2 * sn * sy * sx;
  const count = storeRaw.reduce(
    (last, current) => {
      last[current.status]++;
      return last;
    },
    { EMTY: 0, OCUP: 0, RSVD: 0, LOCK: 0 }
  );
  function renderNum(e) {
    return `${e}（${Math.round((e / total) * 1000) / 10}%）`;
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant='h5' component='div'>
          库容：2*{sn}*{sy}*{sx}={total}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          占用：{renderNum(count.OCUP)}，空置：{renderNum(count.EMTY)}
        </Typography>
        <Typography color='text.secondary'>
          预定：{renderNum(count.RSVD)}，待取：{renderNum(count.LOCK)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button style={{ margin: 'auto' }} size='small' onClick={() => navigate('/store')}>
          详情
        </Button>
      </CardActions>
    </Card>
  );
}
export default mobxObserver(StoreInfoCard);
