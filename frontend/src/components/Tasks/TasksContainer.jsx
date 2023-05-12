import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, zhCN } from '@mui/x-data-grid';
import { mobxObserver, useStores } from '../../store';
import { Checkbox, Chip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'stacker',
    headerName: '码垛机',
    width: 100,
    valueGetter: e => e.value + 1,
  },
  {
    field: 'type',
    headerName: '类型',
    width: 100,
    renderCell: e => {
      switch (e.row.type) {
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
    field: 'location',
    headerName: '位置',
    width: 150,
  },
  {
    field: 'priority',
    headerName: '优先',
    width: 100,
    renderCell: e => {
      return <Checkbox checked={e.row.priority} />;
    },
  },
  {
    field: 'executing',
    headerName: '执行中',
    width: 100,
    renderCell: e => {
      return <Checkbox checked={e.row.executing} />;
    },
  },
  {
    field: 'time',
    headerName: '时间',
    width: 300,
  },
];

function TasksContainer() {
  const { runningStore } = useStores();
  return (
    <Box sx={{ height: '80vh', width: 'auto' }}>
      <DataGrid
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        rows={runningStore.taskRaw}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        autoPageSize
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
export default mobxObserver(TasksContainer);
