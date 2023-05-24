import axios from 'axios';
import Main from './pages/Main';
import './App.css';

function App() {
  axios.defaults.baseURL = '/api/';
  return <Main />;
}

export default App;
