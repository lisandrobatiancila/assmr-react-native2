import axios from 'axios';
const IPCONFIG: string = '192.168.43.222:';
const SERVERPORT: number = 1000;
const BASEURL = `http://${IPCONFIG}${SERVERPORT}`;

const instance = axios.create({
  baseURL: BASEURL,
});

instance.interceptors.request.use(config => {
  return config;
});

export {instance, BASEURL};
