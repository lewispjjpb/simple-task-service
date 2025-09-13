export const saveToLocalStorage = (key: string, value: any): void => {
  //set localStorage value at key
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    const storageValue = localStorage.getItem(key);
    return JSON.parse(storageValue || '');
  } catch (e) {
    console.error(e);
    return null;
  }
};
