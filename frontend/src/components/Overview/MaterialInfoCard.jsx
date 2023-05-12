import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mobxObserver, useStores } from '../../store';
import { useNavigate } from 'react-router-dom';

function MaterialInfoCard() {
  const { materialStore } = useStores();
  const navigate = useNavigate();
  const data = materialStore.materialStore;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant='h5' component='div'>
          物料
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          已存储：{data.length}（类）
        </Typography>
        <Typography color='text.secondary'>&emsp;</Typography>
      </CardContent>
      <CardActions>
        <Button style={{ margin: 'auto' }} size='small' onClick={() => navigate('/materials/setting')}>
          详情
        </Button>
      </CardActions>
    </Card>
  );
}
export default mobxObserver(MaterialInfoCard);
