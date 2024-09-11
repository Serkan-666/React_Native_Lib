import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { useReducer } from 'react';
import { Platform } from 'react-native';

function useAsyncState(
    initialValue = [true, null],
) {
    return useReducer(
        (state, action = null) => [false, action],
        initialValue
    );
}

export async function setSecureStorageItemAsync(key, value) {
    if (Platform.OS === 'web') {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        try {
            if (value == null) {
                await SecureStore.deleteItemAsync(key);
            } else {
                await SecureStore.setItemAsync(key, value);
            }
        } catch (e) {
            console.error('Error saving item:', e);
        }
    }
}

export function useSecureStorage(key) {
    const [state, setState] = useAsyncState();

    React.useEffect(() => {
        if (Platform.OS === 'web') {
            try {
                if (typeof localStorage !== 'undefined') {
                    setState(localStorage.getItem(key));
                }
            } catch (e) {
                console.error('Local storage is unavailable:', e);
            }
        } else {
            SecureStore.getItemAsync(key).then(value => {
                setState(value);
            });
        }
    }, [key]);

    const setValue = React.useCallback(
        (value) => {
            setState(value);
            setSecureStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setValue];
}
