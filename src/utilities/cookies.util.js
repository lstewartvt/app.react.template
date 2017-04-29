import reactCookie from 'react-cookie';

const cookies = {

  get: (key) => {
    return reactCookie.load(key);
  },
  remove: (key) => {
    reactCookie.remove(key);
  },
  set: (key, value, options) => {

    options = options || {};
    reactCookie.save(key, value, {
      path: options.path,
      secure: _secure
    });
  }
};

export default cookies;
