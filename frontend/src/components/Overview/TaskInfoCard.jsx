import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mobxObserver, useStores } from '../../store';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TaskInfoCard() {
  const { runningStore } = useStores();
  const navigate = useNavigate();
  const data = runningStore.taskRaw;
  if (data.length === 0) {
    return <CircularProgress disableShrink />;
  }
  const count = data.reduce(
    (last, current) => {
      last[current.type]++;
      current.executing && last[3]++;
      return last;
    },
    [0, 0, 0, 0]
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant='h5' component='div'>
          任务队列：{count[0] + count[1] + count[2]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          入库：{count[0]}，出库：{count[1]}
        </Typography>
        <Typography color='text.secondary'>
          执行中：{count[3]}，等待：{count[0] + count[1] + count[2] - count[3]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button style={{ margin: 'auto' }} size='small' onClick={() => navigate('/tasks')}>
          详情
        </Button>
      </CardActions>
    </Card>
  );
}
export default mobxObserver(TaskInfoCard);
