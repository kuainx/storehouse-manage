import { Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import StoreView from '../pages/StoreView';
import Materials from '../pages/Materials';
import Settings from '../pages/Settings';
import MaterialSetting from '../pages/MaterialSetting';
import Simulator from '../pages/Simulator';

export default function RouterContainer() {
  return (
    <Routes>
      <Route path='/' element={<Overview />}></Route>
      <Route path='/store' element={<StoreView />}></Route>
      <Route path='/materials' element={<Materials />}></Route>
      <Route path='/materials/setting' element={<MaterialSetting />}></Route>
      <Route path='/settings' element={<Settings />}></Route>
      <Route path='/simulator' element={<Simulator />}></Route>
    </Routes>
  );
}
