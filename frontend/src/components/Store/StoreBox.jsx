import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

function StatusSign({ status }) {
  switch (status) {
    case 0:
      return <Chip label='Empty/空' color='primary' variant='outlined' />;
    case 1:
      return <Chip label='Reserved/已预订' color='warning' variant='outlined' />;
    case 2:
      return <Chip label='Occupied/已占用' color='success' variant='outlined' />;
    case 3:
      return <Chip label='Locked/已锁定' color='error' variant='outlined' />;
  }
}
StatusSign.propTypes = {
  status: PropTypes.number.isRequired,
};
export default function StoreBox({ n, x, y }) {
  const status = Math.floor(Math.random() * 4);
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          {n}-{y + 1}-{x + 1}
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          <StatusSign status={status} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          螺栓M6×8 3箱
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>移出</Button>
      </CardActions>
    </Card>
  );
}
StoreBox.propTypes = {
  n: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
};
