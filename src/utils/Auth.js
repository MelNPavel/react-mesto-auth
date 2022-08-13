import { baseUrl } from "./constants.js";


const checkResponse = (res) => 
  res.ok ? 
    res.json()
    : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));

export const auth = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => checkResponse(res))
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => checkResponse(res))
};

export const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => checkResponse(res))
};