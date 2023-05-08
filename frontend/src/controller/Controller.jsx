import { useStores } from '../store';
import { fetchMaterial } from './request';
export default async function Controller() {
  const { materialStore } = useStores();
  materialStore.materialList = await fetchMaterial();
  console.log(materialStore);
}
