import * as KEY from 'constants/elementKeys';

export default [
  {
    key: 'openline-plan',
    icon: 'openline',
    title: '開線計劃',
    children: [
      {
        key: KEY.OPENLINE_PLAN_SHOW,
        label: '展示',
        child: []
      },
      {
        key: KEY.OPENLINE_PLAN_COMPARE,
        label: '比對',
        child: []
      },
      {
        key: KEY.OPENLINE_PLAN_MAINTAIN,
        label: '維護',
        child: []
      },
    ],
  },
  {
    key: 'manpower-require',
    icon: 'manpower',
    title: '需求人力',
    children: [
      {
        key: KEY.MANPOWER_REQUIRE_TOTAL,
        label: '總需求人力',
        child: []
      },
      {
        key: KEY.MANPOWER_REQUIRE_JOB,
        label: '淨崗位需求人力',
        child: []
      },
      {
        key: KEY.MANPOWER_REQUIRE_EXTRA,
        label: '額外需求人力',
        child: []
      },
      {
        key: KEY.MANPOWER_REQUIRE_OTHER,
        label: '其他人力',
        child: []
      }
    ],
  },
  {
    key: 'manage',
    icon: 'manpower',
    title: '管理',
    children: [
      {
        key: KEY.MANAGE_VISIT_LOG,
        label: '訪問統計',
        child: []
      },
      {
        key: KEY.MANAGE_AUTH,
        label: '權限管理',
        child: []
      }
    ],
  }
];
