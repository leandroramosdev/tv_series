import axios from 'axios';

let baseUrl = window.location.href;


if (baseUrl.indexOf('3000') > -1) {
  baseUrl = 'http://localhost:8888/test-exogroup/tv-series';
}

const api = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
});

export default api;
