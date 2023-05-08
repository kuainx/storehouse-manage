import { makeAutoObservable } from 'mobx';

export function materialStore() {
  return makeAutoObservable({
    materialStore: [],
    materialList: [],
    storeList: [],
    setProductNum(index, n) {
      this.productNum[index] = n;
    },
    get productPrice() {
      let sum = 0;
      return sum;
    },
    get totalPrice() {
      return Math.round((this.battery * 48.8 + this.productPrice) * 100) / 100;
    },
  });
}
