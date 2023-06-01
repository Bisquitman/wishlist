import { API_URI, JWT_TOKEN_KEY } from './const.js';

export const getLogin = async (token) => {
  try {
    const response = await fetch(`${API_URI}/getLogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (login) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URI}/user/${login}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const sendDataUser = async (id, userData) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URI}/user/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const sendDataWish = async (wishData) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URI}/addWish`, {
      method: 'POST',
      headers,
      body: JSON.stringify(wishData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDataWish = async (id, wishData) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URI}/wish/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(wishData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getWish = async (id) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URI}/wish/${id}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWish = async (id) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URI}/wish/${id}`, {
      method: 'DELETE',
      headers,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
