import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const extra: AppRouteModule = {
  path: '/extra',
  name: 'Extra',
  component: LAYOUT,
  redirect: '/extra/alarm',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.extra.extra'),
  },
  children: [
    {
      path: 'alarm',
      name: 'Alarm',
      component: () => import('@/views/extra/alarm/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.extra.alarm'),
      },
    },
    {
      path: 'blinds',
      name: 'Blinds',
      component: () => import('@/views/extra/blinds/index.vue'),
      meta: {
        title: t('routes.extra.blinds'),
      },
    },
  ],
};

export default extra;
