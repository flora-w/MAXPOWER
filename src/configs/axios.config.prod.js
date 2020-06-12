import axios from 'axios';

import tokenInterceptor from 'utils/tokenInterceptor';

axios.interceptors.request.use(tokenInterceptor, Promise.reject);
