import axios from 'axios';
const IPCONFIG: string = '10.0.8.71:';
const SERVERPORT: number = 1000;
const BASEURL = `http://${IPCONFIG}${SERVERPORT}`;

const instance = axios.create({
  baseURL: BASEURL,
});

instance.interceptors.request.use(config => {
  return config;
});

export {instance, BASEURL};
