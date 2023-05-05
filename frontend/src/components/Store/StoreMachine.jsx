import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../Utils/CircularProgressWithLabel';
import PropTypes from 'prop-types';

export default function StoreMachine({ n }) {
  return (
    <Card sx={{ minWidth: 200, height: '100%' }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          <CircularProgressWithLabel value={Math.random() * 100} />
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          码垛机{n + 1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {Math.floor(Math.random() * 10)}任务
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>移出</Button>
      </CardActions>
    </Card>
  );
}
StoreMachine.propTypes = {
  n: PropTypes.number.isRequired,
};
