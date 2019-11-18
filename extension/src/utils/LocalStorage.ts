type StorageItems = {
  accessToken?: string;
  userId?: number;
};

const getItem = (key: string): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, res => {
      console.log("resolved key: ", key, " to res: ", res);
      resolve(res[key]);
    });
  });
};

const setItem = async (params: StorageItems): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(params, () => {
      console.log("Settings saved");
      resolve();
    });
  });
};

const removeItem = async (key): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      console.log(`removed key: ${key} from local storage`);
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
