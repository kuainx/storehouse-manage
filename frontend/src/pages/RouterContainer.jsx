import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import StoreView from './StoreView';
import Materials from './Materials';
import Settings from './Settings';
import MaterialSetting from './MaterialSetting';
import Simulator from './Simulator';
import Tasks from './Tasks';

export default function RouterContainer() {
  return (
    <Routes>
      <Route path='/' element={<Overview />}></Route>
      <Route path='/store' element={<StoreView />}></Route>
      <Route path='/tasks' element={<Tasks />}></Route>
      <Route path='/materials' element={<Materials />}></Route>
      <Route path='/materials/setting' element={<MaterialSetting />}></Route>
      <Route path='/settings' element={<Settings />}></Route>
      <Route path='/simulator' element={<Simulator />}></Route>
    </Routes>
  );
}
