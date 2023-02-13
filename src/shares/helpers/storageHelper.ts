import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_ACCESS_TOKEN_IAO } from '../../constants/storage';

export function hasStorageJwtToken() {
  return !!localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
}

export function removeStorageJwtToken() {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_IAO);
}

export function setStorageJwtToken(token: string, tokenIAO: string) {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_IAO, tokenIAO);
}

export function getStorageJwtToken() {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
}
