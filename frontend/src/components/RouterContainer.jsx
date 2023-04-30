import { Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import StoreView from '../pages/StoreView';
import Materials from '../pages/Materials';
import Settings from '../pages/Settings';

export default function RouterContainer() {
  return (
    <Routes>
      <Route path='/' element={<Overview />}></Route>
      <Route path='/store' element={<StoreView />}></Route>
      <Route path='/materials' element={<Materials />}></Route>
      <Route path='/settings' element={<Settings />}></Route>
    </Routes>
  );
}
