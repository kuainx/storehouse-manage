import { makeAutoObservable, runInAction } from 'mobx';
import { fetchSettings } from '../controller/request';

export function runningStore() {
  return makeAutoObservable({
    polling: false,
    togglePolling() {
      this.polling = !this.polling;
    },
    localSettings: {},
    lastFetchSettings: 0,
    get settings() {
      this.getSettings();
      return this.localSettings;
    },
    async getSettings(forceUpdate = false) {
      if (forceUpdate || this.lastFetchSettings + 60 * 1000 < Date.now()) {
        const data = await fetchSettings();
        const ret = {};
        data.forEach(e => (ret[e.key] = e.value));
        runInAction(() => {
          this.localSettings = ret;
          this.lastFetchSettings = Date.now();
        });
      }
      return this.localSettings;
    },
  });
}
