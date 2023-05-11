import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { mobxObserver, useStores } from '../../store';
import { CircularProgress } from '@mui/material';

function StatusSign({ status }) {
  switch (status) {
    case 'EMTY':
      return <Chip label='Empty/空' color='success' variant='outlined' />;
    case 'RSVD':
      return <Chip label='Reserved/已预订' color='warning' variant='outlined' />;
    case 'OCUP':
      return <Chip label='Occupied/已占用' color='primary' variant='outlined' />;
    case 'LOCK':
      return <Chip label='Locked/已锁定' color='error' variant='outlined' />;
  }
}
StatusSign.propTypes = {
  status: PropTypes.string.isRequired,
};
function StoreBox({ n, x, y }) {
  const { materialStore } = useStores();
  const data = materialStore.storeData[n]?.[y]?.[x];
  if (!data) {
    return <CircularProgress disableShrink />;
  }
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          {n + 1}-{y + 1}-{x + 1}
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          <StatusSign status={data.status} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {data.materialDisplay} x {data.num}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size='small'>移出</Button>
      </CardActions> */}
    </Card>
  );
}
export default mobxObserver(StoreBox);
StoreBox.propTypes = {
  n: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
};
