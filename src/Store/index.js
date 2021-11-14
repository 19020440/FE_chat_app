import { AuthStore } from './AuthStore';
import { createContext } from 'react';

export const stores = Object.freeze({
  AuthStore: new AuthStore(),
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
