// import fetchBackendData, { insertToRxdb } from '../rxdb/fetchData';

export const login = (password: string, username: string) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      username,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.token) {
        document.cookie = `token=${result.token}`;
        localStorage.setItem('username', result.data.username);
        localStorage.setItem('admin', result.data.admin);

        return result;
      }
      return result;
    });

export const verifyToken = () => {
  if (document.cookie) {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/login/verifyToken`, {
      method: 'GET',
      headers: {
        Authorization: document.cookie,
        credentials: 'include',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  }

  return new Promise((res) => {
    res({ success: false });
  });
};

export const logout = () => {
  document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
};
