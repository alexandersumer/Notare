type StorageItems = {
  accessToken?: string;
  userId?: number;
  email?: string;
};

const getItem = (key: string): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, res => {
      resolve(res[key]);
    });
  });
};

const setItem = async (params: StorageItems): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(params, () => {
      resolve();
    });
  });
};

const removeItem = async (key): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      resolve();
    });
  });
};

const LocalStorage = {
  getItem,
  setItem,
  removeItem
};

export default LocalStorage;
