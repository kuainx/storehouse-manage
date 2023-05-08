import axios from 'axios';
import Main from './pages/Main';
import Controller from './controller/Controller';
import './App.css';

function App() {
  axios.defaults.baseURL = '/api';
  return (
    <>
      <Main></Main>
      <Controller></Controller>
    </>
  );
}

export default App;
