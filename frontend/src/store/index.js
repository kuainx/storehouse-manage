import React from 'react';
import { observer } from 'mobx-react-lite';
import { materialStore } from './materialStore';
import { runningStore } from './runningStore';

export const storesContext = React.createContext({
  runningStore: new runningStore(),
  materialStore: new materialStore(),
});

export const mobxObserver = observer;
export const useStores = () => React.useContext(storesContext);
