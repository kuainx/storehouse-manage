import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function InfoCard1() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          进行中任务：5
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          2023年4月28日02:26:15
        </Typography>
        <Typography variant='body2'>3库区A-03-24</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>详情</Button>
      </CardActions>
    </Card>
  );
}
