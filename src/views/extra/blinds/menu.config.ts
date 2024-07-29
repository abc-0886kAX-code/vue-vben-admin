/*
 * @FilePath: \vue-vben-admin\src\views\extra\alarm\menu.config.ts
 * @Author: zhangxin
 * @Date: 2024-07-17 16:58:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-07-17 17:20:56
 * @Description:
 */
import { defineAsyncComponent, markRaw } from 'vue';

export default [
  {
    keyword: 'StatisticalAnalysis',
    title: '盲板统计分析',
    component: markRaw(defineAsyncComponent(() => import('./module/StatisticalAnalysis.vue'))),
  },
  {
    keyword: 'IntelligentMonitor',
    title: '盲板智慧监测',
    component: markRaw(defineAsyncComponent(() => import('./module/IntelligentMonitor.vue'))),
  },
];
