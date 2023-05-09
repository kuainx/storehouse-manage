import { makeAutoObservable, runInAction } from 'mobx';
import { fetchMaterial, fetchStore } from '../controller/request';

export function materialStore() {
  return makeAutoObservable({
    localMaterialList: [],
    lastFetchMaterial: 0,
    get materialStore() {
      this.getMaterialStore();
      return this.localMaterialList;
    },
    async getMaterialStore(forceUpdate = false) {
      if (forceUpdate || this.lastFetchMaterial + 10 * 1000 < Date.now()) {
        const data = await fetchMaterial();
        data.forEach(e => (e.display = `${e.name}(${e.unit})`));
        runInAction(() => {
          this.localMaterialList = data;
          this.lastFetchMaterial = Date.now();
        });
      }
      return this.localMaterialList;
    },
    localStoreRaw: [],
    lastFetchStoreRaw: 0,
    get storeRaw() {
      this.getStoreRaw();
      return this.localStoreRaw;
    },
    async getStoreRaw(forceUpdate = false) {
      if (forceUpdate || this.lastFetchStoreRaw + 5 * 1000 < Date.now()) {
        const data = await fetchStore();
        runInAction(() => {
          this.localStoreRaw = data;
          this.lastFetchStoreRaw = Date.now();
        });
      }
      return this.localStoreRaw;
    },
    get storeData() {
      return this.storeRaw.map(e => ({ ...e, materialDisplay: this.materialStore[e.material]?.display }));
    },
  });
}
