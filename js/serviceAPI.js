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
    console.log('data: ', data);

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