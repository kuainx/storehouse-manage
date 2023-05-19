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
import { postPlc } from '../../controller/request';

function num2hex(num, len = 2) {
  return num.toString(16).padStart(len, 0);
}
function hex2num(hex) {
  return parseInt(hex, 16);
}
function loc2str(loc) {
  return `<${hex2num(loc.substr(0, 2)) + 1}-${hex2num(loc.substr(2, 2)) + 1}-${hex2num(loc.substr(4)) + 1}>`;
}

function PlcController({ addPlcData }) {
  const [type, setType] = useState(0);
  const [stacker, setStacker] = useState(0);
  const handleChangeType = event => {
    setType(event.target.value);
  };
  const handleChangeStacker = event => {
    setStacker(event.target.value);
  };
  const { runningStore } = useStores();
  const sendRequest = async () => {
    const send = `01${num2hex(stacker)}030002${num2hex(type)}`;
    const response = await postPlc(send);
    const req = {
      send: true,
      raw: send,
      stacker: stacker,
      type: type,
      time: getTimeText(),
    };
    const error = response.substr(0, 2) === '03';
    const resp = {
      send: false,
      raw: response,
      error,
      type: parseInt(response.substr(2, 2)),
      stacker: error ? '#' : loc2str(response.substr(4)),
      time: getTimeText(),
    };
    addPlcData([req, resp]);
  };

  return (
    <div className='simulatorControlContainer'>
      <FormControl sx={{ m: 1, minWidth: '80px' }} size='small'>
        <InputLabel id='erp-material-label'>堆垛机</InputLabel>
        <Select
          labelId='erp-material-label'
          id='erp-material'
          value={stacker}
          label='堆垛机'
          onChange={handleChangeStacker}
        >
          {[...Array(parseInt(runningStore.settings.storen || 0)).keys()].map(e => (
            <MenuItem value={e} key={e}>
              {e + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: '100px' }} size='small'>
        <InputLabel id='erp-type-label'>上一任务</InputLabel>
        <Select labelId='erp-type-label' id='erp-type' value={type} label='类型' onChange={handleChangeType}>
          <MenuItem value={0}>无</MenuItem>
          <MenuItem value={1}>完成</MenuItem>
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
export default mobxObserver(PlcController);
PlcController.propTypes = {
  addPlcData: PropTypes.func.isRequired,
};
