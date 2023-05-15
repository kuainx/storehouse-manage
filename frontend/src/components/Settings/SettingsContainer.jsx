import * as React from 'react';
import Item from '../Utils/Item';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function SettingsContainer() {
  return (
    <Item style={{ display: 'flex' }}>
      <div>
        <iframe className='settingFrame' src='/api/admin'></iframe>
      </div>
      <div className='settingBtnContainer'>
        <Button variant='contained' startIcon={<OpenInNewIcon />} onClick={() => window.open('/api/admin')}>
          新标签打开
        </Button>
        <Button
          color='error'
          variant='contained'
          startIcon={<RefreshIcon />}
          onClick={() => window.open('/api/management/init/settings')}
        >
          重置设置
        </Button>
        <Button
          color='error'
          variant='contained'
          startIcon={<RefreshIcon />}
          onClick={() => window.open('/api/management/init/stores')}
        >
          初始化仓库
        </Button>
      </div>
    </Item>
  );
}
