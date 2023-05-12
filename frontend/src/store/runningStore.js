import { makeAutoObservable, runInAction } from 'mobx';
import { fetchSettings, fetchTask } from '../controller/request';

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
    localTaskRaw: [],
    lastFetchTask: 0,
    get taskRaw() {
      this.getTasksRaw();
      return this.localTaskRaw;
    },
    async getTasksRaw(forceUpdate = false) {
      if (forceUpdate || this.lastFetchTask + 60 * 1000 < Date.now()) {
        const data = await fetchTask();
        data.forEach(e => (e.location = `<${e.targetn + 1}-${e.targety + 1}-${e.targetx + 1}>`));
        runInAction(() => {
          this.localTaskRaw = data;
          this.lastFetchTask = Date.now();
        });
      }
      return this.localTaskRaw;
    },
    get taskList() {
      const ret = [];
      this.taskRaw.forEach(e => {
        ret[e.stacker] ??= [];
        ret[e.stacker].push(e);
      });
      return ret;
    },
  });
}
