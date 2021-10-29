// path: /axios.config.js
// set defaults axios config for Next.js
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = publicRuntimeConfig.backendUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;