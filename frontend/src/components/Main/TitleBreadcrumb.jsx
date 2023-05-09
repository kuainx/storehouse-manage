import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { routerConfig } from '../../controller/routerConfig';
import DynamicIcon from '../Utils/DynamicIcon';

export default function TitleBreadcrumb() {
  const location = useLocation();
  const locData = useMemo(() => {
    return routerConfig.find(e => location.pathname == e[1]);
  }, [location.pathname]);
  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ color: 'white' }}>
      <Typography variant='h6' noWrap component='div' sx={{ display: 'flex', alignItems: 'center' }}>
        <WidgetsIcon style={{ marginRight: '10px' }} />
        立体库管理系统 - 上海大学
      </Typography>
      <Typography variant='h7' noWrap component='div' sx={{ display: 'flex', alignItems: 'center' }}>
        <DynamicIcon icon={locData[2]} style={{ marginRight: '10px' }}></DynamicIcon>
        {locData[0]}
      </Typography>
    </Breadcrumbs>
  );
}
