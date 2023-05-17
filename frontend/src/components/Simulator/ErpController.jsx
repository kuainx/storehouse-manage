import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { getTimeText } from '../../controller/utils';
import { mobxObserver, useStores } from '../../store';
import { postTask } from '../../controller/request';

function ErpController({ addErpData }) {
  const [type, setType] = useState(0);
  const [material, setMaterial] = useState(0);
  const handleChangeType = event => {
    setType(event.target.value);
  };
  const handleChangeMaterial = event => {
    setMaterial(event.target.value);
  };
  const { materialStore } = useStores();
  const data = materialStore.materialStore;
  const sendRequest = async () => {
    const req = {
      send: true,
      type,
      material_id: data[material].id,
      material: data[material].display,
      task: '',
      time: getTimeText(),
    };
    const response = await postTask(req);
    const resp = {
      send: false,
      type: response.type,
      material: `<${response.targetn + 1}-${response.targety + 1}-${response.targetx + 1}>`,
      task: response.id,
      time: getTimeText(),
    };
    addErpData([req, resp]);
  };

  return (
    <div className='simulatorControlContainer'>
      <FormControl sx={{ m: 1, minWidth: '80px' }} size='small'>
        <InputLabel id='erp-type-label'>类型</InputLabel>
        <Select labelId='erp-type-label' id='erp-type' value={type} label='类型' onChange={handleChangeType}>
          <MenuItem value={0}>入库</MenuItem>
          <MenuItem value={1}>出库</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} size='small'>
        <InputLabel id='erp-material-label'>物料</InputLabel>
        <Select
          labelId='erp-material-label'
          id='erp-material'
          value={material}
          label='物料'
          onChange={handleChangeMaterial}
        >
          {data.map((e, index) => (
            <MenuItem value={index} key={index}>
              {e.id}:{e.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} size='small'>
        <Button variant='contained' onClick={sendRequest}>
          发送
        </Button>
      </FormControl>
      <FormControl sx={{ m: 1, maxWidth: '120px' }} size='small'>
        <TextField label='轮询时间(ms)' size='small' variant='outlined' value={5000} />
      </FormControl>
      <FormControl sx={{ m: 1 }} size='small'>
        <FormControlLabel control={<Switch />} label='自动' />
      </FormControl>
    </div>
  );
}
export default mobxObserver(ErpController);
ErpController.propTypes = {
  addErpData: PropTypes.func.isRequired,
};
