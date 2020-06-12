import { lazy } from 'react';

import LayoutComp from './components/Layout';

import * as KEYS from './constants/elementKeys';

export const publicRoutes = [
  {
    path: `/${KEYS.LOGIN}`,
    component: lazy(() => import('./modules/auth/LoginPage')),
  },
  {
    path: `/${KEYS.OAUTH}`,
    component: lazy(() => import('./modules/auth/OauthPage')),
  },
  {
    path: `/${KEYS.UNAUTHORIZED}`,
    component: lazy(() => import('./modules/auth/UnauthorizedPage')),
  },
];

export const privateRoutes = [
  {
    Layout: LayoutComp,
    subRoutes: [
      {
        path: `/${KEYS.OPENLINE_PLAN_SHOW}`,
        component: lazy(() => import('./modules/openline-plan-show/OpenlinePlanShowPage')),
      },
      {
        path: `/${KEYS.OPENLINE_PLAN_MAINTAIN}`,
        component: lazy(() => import('./modules/openline-plan-maintain/OpenlinePlanMaintainPage')),
      }
    ],
  },
];
