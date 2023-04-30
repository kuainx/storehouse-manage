import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function SettingsContainer() {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid item xs={12} style={{ marginBottom: '20px' }}>
        <Item>
          <h2>设置</h2>
        </Item>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField label='数据库ip' defaultValue='localhost' helperText='postgresql' />
          <TextField label='数据库端口' defaultValue='5432' />
          <TextField label='数据库用户名' />
          <TextField label='数据库密码' />
          <TextField label='数据库库名' />
          <TextField label='PLCip' defaultValue='localhost' />
          <TextField label='PLC端口' defaultValue='8899' />
        </Grid>
      </Grid>
    </Box>
  );
}
