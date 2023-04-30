import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InfoCard1 from './InfoCard1';
import Timer from './Timer';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import DoneIcon from '@mui/icons-material/Done';
import WifiIcon from '@mui/icons-material/Wifi';
import { IconButton } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OverviewContainer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <h1>概览</h1>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>
              <span style={{ marginRight: '20px' }}>
                服务端已连接
                <IconButton aria-label='pause' color='success'>
                  <DoneIcon />
                </IconButton>
              </span>
              <span style={{ marginRight: '20px' }}>
                系统运行中
                <IconButton aria-label='pause' color='secondary'>
                  <PauseCircleIcon />
                </IconButton>
              </span>
              <span>
                PLC已连接
                <IconButton aria-label='pause' color='primary'>
                  <WifiIcon />
                </IconButton>
              </span>
            </h2>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <InfoCard1></InfoCard1>
        </Grid>
        <Grid item xs={4}>
          <InfoCard1></InfoCard1>
        </Grid>
        <Grid item xs={4}>
          <InfoCard1></InfoCard1>
        </Grid>
        <Grid item xs={12}>
          <Timer></Timer>
        </Grid>
      </Grid>
    </Box>
  );
}
