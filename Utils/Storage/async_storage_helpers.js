import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorageSet = async (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('AsyncStorage set error:', error);
  }
};

const asyncStorageGet = async (key) => {
  try {
    const serializedValue = await AsyncStorage.getItem(key);
    if (serializedValue) {
      try {
        return JSON.parse(serializedValue);
      } catch (e) {
        return serializedValue;
      }
    }
    return null;
  } catch (error) {
    console.error('AsyncStorage get error:', error);
    return null;
  }
};

const asyncStorageRemove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('AsyncStorage remove error:', error);
  }
};

const asyncStorageClear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('AsyncStorage clear error:', error);
  }
};

export {
  asyncStorageClear, asyncStorageGet,
  asyncStorageRemove, asyncStorageSet
};
