import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';

function useAsyncState(initialValue = [true, null]) {
  return useReducer((state, action = null) => [false, action], initialValue);
}

export async function setStorageItemAsync(key, value) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
}

export function useSecureStorageState(key) {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      try {
        const parsed = value ? JSON.parse(value) : null;
        setState(parsed);
      } catch (error) {
        setState(value || null);
      }
    });
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key],
  );

  return [state, setValue];
}
