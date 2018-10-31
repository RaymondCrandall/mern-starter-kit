/* Choose which mock API we want to use */

const MockApi = new URLSearchParams(window.location.search).get('useMockApi');

export default function getBaseUrl() {
  return (MockApi === 'true') ? 'http://localhost:3001/' : 'https://arcane-savannah-98696.herokuapp.com/';
}
