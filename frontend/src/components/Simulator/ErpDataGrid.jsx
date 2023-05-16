import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, zhCN } from '@mui/x-data-grid';
import { Checkbox, Chip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const columns = [
  { field: 'id', headerName: '#', width: 50 },
  {
    field: 'send',
    headerName: '来源',
    width: 110,
    renderCell: e => {
      if (e.value) {
        return <Chip variant='outlined' color='warning' icon={<SendIcon />} label='ERP' />;
      } else {
        return <Chip variant='outlined' color='success' icon={<ReplyAllIcon />} label='Server' />;
      }
    },
  },
  {
    field: 'type',
    headerName: '类型',
    width: 100,
    renderCell: e => {
      switch (e.value) {
        case 0:
          return <Chip variant='outlined' color='primary' icon={<DownloadIcon />} label='入库' />;
        case 1:
          return <Chip variant='outlined' color='success' icon={<UploadIcon />} label='出库' />;
        case 2:
          return <Chip variant='outlined' color='warning' icon={<SearchIcon />} label='盘库' />;
      }
    },
  },
  {
    field: 'material',
    headerName: '物料/仓库',
    width: 150,
  },
  {
    field: 'task',
    headerName: '任务',
    width: 100,
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
