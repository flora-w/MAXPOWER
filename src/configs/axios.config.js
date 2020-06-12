import axios from 'axios';

import tokenInterceptor from 'utils/tokenInterceptor';
import mockInterceptor from 'utils/mockInterceptor';

axios.interceptors.request.use(mockInterceptor, Promise.reject);
axios.interceptors.request.use(tokenInterceptor, Promise.reject);
