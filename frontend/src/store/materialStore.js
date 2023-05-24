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
        data.forEach(e => {
          e.display = `${e.name}(${e.unit})`;
          e.total = 0;
          e.location = [];
        });
        data.sort((a, b) => a.id - b.id);
        runInAction(() => {
          this.localMaterialList = data;
          this.lastFetchMaterial = Date.now();
        });
      }
      return this.localMaterialList;
    },
    getMaterialById(id) {
      return this.materialStore.find(e => e.id === id);
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
    shelfData: [],
    materialData: [],
    get getMaterialData() {
      this.storeData;
      return this.materialData;
    },
    get storeData() {
      const ret = [];
      const shelfData = [];
      const materialData = [];
      this.storeRaw.forEach(e => {
        ret[e.storen] ??= [];
        ret[e.storen][e.storey] ??= [];
        ret[e.storen][e.storey][e.storex] = { ...e, materialDisplay: this.getMaterialById(e.material)?.display };
        shelfData[e.storen] ??= { EMTY: 0, OCUP: 0, RSVD: 0, LOCK: 0 };
        shelfData[e.storen][e.status]++;
        if (e.status === 'OCUP') {
          const materialIndex = materialData.findIndex(material => material.id === e.material);
          if (materialIndex === -1) {
            materialData.push({
              id: e.material,
              display: this.getMaterialById(e.material)?.display,
              total: e.num,
              location: [e],
            });
          } else {
            materialData[materialIndex].total += e.num;
            materialData[materialIndex].location.push(e);
          }
        }
      });
      runInAction(() => {
        this.shelfData = shelfData;
        this.materialData = materialData;
      });
      return ret;
    },
  });
}
