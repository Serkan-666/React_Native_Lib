import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useReducer } from 'react';

function useAsyncState(initialValue = [true, null]) {
  return useReducer((state, action = null) => [false, action], initialValue);
}

export async function setStorageItemAsync(key, value) {
  try {
    if (value == null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.error('Error saving item:', e);
  }
}

export function useAsyncStorageState(key) {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    AsyncStorage.getItem(key).then((value) => {
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
