import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../Utils/CircularProgressWithLabel';
import PropTypes from 'prop-types';

export default function StoreShelf({ n, changeN }) {
  return (
    <Card sx={{ minWidth: 100, height: '100%' }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          <CircularProgressWithLabel value={Math.floor(Math.random() * 1000) / 10} />
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          扇区{n + 1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={changeN}>
          查看
        </Button>
      </CardActions>
    </Card>
  );
}
StoreShelf.propTypes = {
  n: PropTypes.number.isRequired,
  changeN: PropTypes.func,
};
