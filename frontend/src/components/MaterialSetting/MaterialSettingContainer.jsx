import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, zhCN } from '@mui/x-data-grid';
import { mobxObserver, useStores } from '../../store';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'name',
    headerName: '物料名称',
    width: 150,
  },
  {
    field: 'desc',
    headerName: '备注',
    width: 150,
  },
  {
    field: 'material',
    headerName: '材料',
    width: 150,
  },
  {
    field: 'unit',
    headerName: '单位',
    width: 150,
  },
  {
    field: 'in',
    headerName: '入库',
    width: 100,
    renderCell: p => (
      <strong>
        <Button variant='contained' size='small'>
          入库
        </Button>
      </strong>
    ),
  },
];

function MaterialSettingContainer() {
  const { materialStore } = useStores();
  return (
    <Box sx={{ height: '80vh', width: 'auto' }}>
      <DataGrid
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        rows={materialStore.materialStore}
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
export default mobxObserver(MaterialSettingContainer);
