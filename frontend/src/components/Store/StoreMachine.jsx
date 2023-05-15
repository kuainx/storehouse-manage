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

function StoreMachine({ n }) {
  const { runningStore } = useStores();
  const data = runningStore.taskList[n];
  if (!data) {
    return <CircularProgress disableShrink />;
  }
  const count = data.reduce(
    (last, current) => {
      last[current.type]++;
      return last;
    },
    [0, 0, 0]
  );
  return (
    <Card sx={{ minWidth: 200, height: '100%' }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          <CircularProgressWithLabel value={data.length * 15} />
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          码垛机{n + 1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          任务：{data.length}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          出：{count[1]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          入：{count[0]}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size='small'>移出</Button>
      </CardActions> */}
    </Card>
  );
}
export default mobxObserver(StoreMachine);
StoreMachine.propTypes = {
  n: PropTypes.number.isRequired,
};
