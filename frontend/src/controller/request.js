import axios from 'axios';

export async function fetchMaterial() {
  const response = await axios.get('material/all');
  return response.data;
}

export async function fetchTask() {
  const response = await axios.get('task/all');
  return response.data;
}

export async function fetchStore() {
  const response = await axios.get('store/');
  return response.data;
}

export async function fetchSettings() {
  const response = await axios.get('management/settings/');
  return response.data;
}

export async function postTask(data) {
  const req = {
    priority: false,
    material: {
      material: data.material_id,
      num: 1,
    },
  };
  let url;
  if (data.type === 0) {
    url = 'task/import';
  } else {
    url = 'task/export';
  }
  const response = await axios.post(url, req);
  return response.data;
}

export async function postPlc(data) {
  const response = await axios.post('task/get', { msg: data });
  return response.data.msg;
}
