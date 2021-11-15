import { AuthStore } from './AuthStore';
import { createContext } from 'react';
import { ActionStore } from './ActionStore';

export const stores = Object.freeze({
  AuthStore: new AuthStore(),
  ActionStore: new ActionStore(),
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
