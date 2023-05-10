import axios from 'axios';

export async function fetchMaterial() {
  const response = await axios.get('material/all');
  return response.data;
}

export async function fetchStore() {
  const response = await axios.get('store');
  return response.data;
}
