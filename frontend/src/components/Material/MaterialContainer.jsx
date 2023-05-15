import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, zhCN } from '@mui/x-data-grid';
import { mobxObserver, useStores } from '../../store';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'display',
    headerName: '物料名称',
    width: 150,
  },
  {
    field: 'total',
    headerName: '总数',
    width: 150,
  },
  {
    field: 'location',
    headerName: '存储',
    width: 300,
    valueFormatter: locations =>
      locations.value.map(e => `<${e.storen + 1}-${e.storey + 1}-${e.storex + 1}>`).join(','),
  },
  {
    field: 'out',
    headerName: '出库',
    width: 100,
    renderCell: () => (
      <strong>
        <Button variant='contained' size='small'>
          出库
        </Button>
      </strong>
    ),
  },
];

function MaterialContainer() {
  const { materialStore } = useStores();
  return (
    <Box sx={{ height: '80vh', width: 'auto' }}>
      <DataGrid
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        rows={materialStore.getMaterialData}
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
export default mobxObserver(MaterialContainer);
