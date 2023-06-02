export const addUser = (masterKey: string, action: string, data: any) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/userActions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
    body: JSON.stringify({
      masterKey,
      action,
      data,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        return result;
      }

      throw new Error(result.err.code ?? result.err);
    });

export const editUser = (masterKey: string, action: string, data: any) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/userActions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
    body: JSON.stringify({
      masterKey,
      action,
      data,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        return result;
      }
      throw new Error(result.err.code ?? result.err);
    });

export const deleteUser = (masterKey: string, action: string, data: any) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/userActions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
    body: JSON.stringify({
      masterKey,
      action,
      data,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        return result;
      }
      throw new Error(result.err);
    });

export const getAllUsers = () =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/userActions/getAll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        return result;
      }
      throw new Error(result.err);
    });

export const getById = (userId: number) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/userActions/byId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
    body: JSON.stringify({
      userId,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        return result;
      }

      throw new Error(result.err);
    });
