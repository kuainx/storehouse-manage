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
import { useRef } from 'react';

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max + 1));
}

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
  const sendRequest = async (eType = type, eMaterial = material) => {
    const req = {
      send: true,
      type: eType,
      material_id: data[eMaterial].id,
      material: data[eMaterial].display,
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
  const [auto, setAuto] = useState(false);
  const autoRef = useRef(false);
  const [refresh, setRefresh] = useState(5000);
  function handleAutoChange() {
    console.log('handleAutoChange');
    setAuto(!auto);
    autoRef.current = !auto;
    if (!auto) {
      setTimeout(autoRequest, 100);
    }
  }
  async function autoRequest() {
    const eType = randInt(0, 1);
    const eMaterial = randInt(0, data.length - 1);
    console.log(autoRef.current);
    if (autoRef.current) {
      sendRequest(eType, eMaterial);
      setTimeout(autoRequest, refresh);
    }
  }

  return (
    <div className='simulatorControlContainer'>
      <FormControl sx={{ m: 1, minWidth: '80px' }} size='small'>
        <InputLabel id='erp-type-label'>类型</InputLabel>
        <Select labelId='erp-type-label' id='erp-type' value={type} label='类型' onChange={handleChangeType}>
          <MenuItem value={0}>入库</MenuItem>
          <MenuItem value={1}>出库</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: '200px' }} size='small'>
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
        <Button variant='contained' onClick={() => sendRequest()}>
          发送
        </Button>
      </FormControl>
      <FormControl sx={{ m: 1, maxWidth: '120px' }} size='small'>
        <TextField
          label='轮询时间(ms)'
          size='small'
          variant='outlined'
          value={refresh}
          onChange={event => {
            setRefresh(event.target.value);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} size='small'>
        <FormControlLabel control={<Switch checked={auto} onChange={() => handleAutoChange()} />} label='自动' />
      </FormControl>
    </div>
  );
}
export default mobxObserver(ErpController);
ErpController.propTypes = {
  addErpData: PropTypes.func.isRequired,
};
