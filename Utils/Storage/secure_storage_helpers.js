import * as SecureStore from 'expo-secure-store';

const secureStorageSet = async (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, serializedValue);
  } catch (error) {
    console.error('SecureStore set error:', error);
  }
};

const secureStorageGet = (key) => {
  try {
    const serializedValue = SecureStore.getItem(key);
    if (serializedValue) {
      try {
        return JSON.parse(serializedValue);
      } catch (e) {
        return serializedValue;
      }
    }
    return null;
  } catch (error) {
    console.error('SecureStore get error:', error);
    return null;
  }
};
const secureStorageGetAsync = async (key) => {
  try {
    const serializedValue = await SecureStore.getItemAsync(key);
    if (serializedValue) {
      try {
        return JSON.parse(serializedValue);
      } catch (e) {
        return serializedValue;
      }
    }
    return null;
  } catch (error) {
    console.error('SecureStore get error:', error);
    return null;
  }
};
const secureStorageRemove = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('SecureStore remove error:', error);
  }
};

const secureStorageClear = async (keys) => {
  try {
    if (Array.isArray(keys)) {
      await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
    } else {
      console.warn('SecureStore clear requires a list of keys to delete.');
    }
  } catch (error) {
    console.error('SecureStore clear error:', error);
  }
};


export {
  secureStorageClear, secureStorageGet,
  secureStorageGetAsync,
  secureStorageRemove, secureStorageSet
};

