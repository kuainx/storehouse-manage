import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, zhCN } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const columns = [
  { field: 'id', headerName: '#', width: 50 },
  {
    field: 'send',
    headerName: '来源',
    width: 110,
    renderCell: e => {
      if (e.value) {
        return <Chip variant='outlined' color='warning' icon={<SendIcon />} label='PLC' />;
      } else {
        return <Chip variant='outlined' color='success' icon={<ReplyAllIcon />} label='Server' />;
      }
    },
  },
  {
    field: 'raw',
    headerName: '原始数据',
    width: 120,
  },
  {
    field: 'stacker',
    headerName: '码垛机/库位',
    width: 120,
    valueGetter: e => (e.row.send ? e.value + 1 : e.value),
  },
  {
    field: 'type',
    headerName: '任务',
    width: 120,
    renderCell: e => {
      if (e.row.error) {
        return <Chip variant='outlined' color='error' icon={<WarningAmberIcon />} label={'错误：' + e.value} />;
      }
      switch (e.value) {
        case 0:
          return <Chip variant='outlined' color='secondary' icon={<AccessTimeIcon />} label='无任务' />;
        case 1:
          if (e.row.send) {
            return <Chip variant='outlined' color='success' icon={<CheckCircleOutlineIcon />} label='完成' />;
          } else {
            return <Chip variant='outlined' color='primary' icon={<DownloadIcon />} label='入库' />;
          }

        case 2:
          return <Chip variant='outlined' color='success' icon={<UploadIcon />} label='出库' />;
      }
    },
  },
  {
    field: 'time',
    headerName: '时间',
    width: 200,
  },
];

export default function ErpDataGrid({ data }) {
  return (
    <Box sx={{ height: '100%', width: 'auto' }}>
      <DataGrid
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
        density='compact'
        autoPageSize
        disableRowSelectionOnClick
      />
    </Box>
  );
}
ErpDataGrid.propTypes = {
  data: PropTypes.array.isRequired,
};
