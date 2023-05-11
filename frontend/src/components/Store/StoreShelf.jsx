import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../Utils/CircularProgressWithLabel';
import PropTypes from 'prop-types';
import { mobxObserver, useStores } from '../../store';
import { CircularProgress } from '@mui/material';

function StoreShelf({ n, changeN, total }) {
  const { materialStore } = useStores();
  const data = materialStore.shelfData[n];
  if (!data) {
    return <CircularProgress disableShrink />;
  }
  const val = 1 - data.EMTY / total;
  return (
    <Card sx={{ minWidth: 100, height: '100%' }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          <CircularProgressWithLabel value={val * 100} />
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          扇区{n + 1}
        </Typography>
        {Object.keys(data).map(e => (
          <Typography key={e} sx={{ mb: 1.5 }} color='text.secondary'>
            {e}:{data[e]}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size='small' onClick={changeN} style={{ margin: 'auto' }}>
          查看
        </Button>
      </CardActions>
    </Card>
  );
}
export default mobxObserver(StoreShelf);
StoreShelf.propTypes = {
  n: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  changeN: PropTypes.func,
};
