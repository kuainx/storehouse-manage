import axios from 'axios';

export async function fetchMaterial() {
  const materialData = await axios.get('material/all');
  return materialData.data;
}
