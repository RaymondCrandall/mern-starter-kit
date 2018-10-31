import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

// 'delete' is a reserved JS word
function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE',
  });

  return fetch(request).then(onSuccess, onError);
}


/* HANDLE USERS IN MOCK API */
export function getUsers() {
  return get('users');
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

// put

// post

// delete
