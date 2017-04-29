let local = {

  get: (key) => {
    return localStorage.getItem(key);
  },
  getObject: (key) => {
    const value = local.get(key);
    return value && JSON.parse(value);
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  setObject: (key, value) => {
    local.set(key, JSON.stringify(value));
  }
};

export default local;
