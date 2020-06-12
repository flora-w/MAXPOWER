import env from 'environments/environment';

import * as REDUCER from 'constants/reducerNames';

import authService from 'services/authService';

import { reducer } from 'utils/reduxHelpers';

const profile = env.production
  ? authService.retrieveSessionCredentials()
  : {
      username: 'ManpowerX',
      token: 'whatever',
      entry: '/openline-plan-show',
      tabs: ['.+'],
      views: ['.+'],
      menus: ['.+'],
      exp: Date.now(),
    };

const originState = profile
  ? { ...profile, authenticated: true, authenticating: false, category:"oauth",empno:'',password:'' }
  : { authenticated: false, authenticating: true, category:"oauth",empno:'',password:''};

export default reducer(originState, REDUCER.AUTH);
