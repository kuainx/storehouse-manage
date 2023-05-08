import { makeAutoObservable } from 'mobx';
// import { productList } from '../assets/productsList';
export function runningStore() {
  return makeAutoObservable({
    polling: false,
    togglePolling() {
      this.polling = !this.polling;
    },
  });
}
