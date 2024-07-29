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
    keyword: 'MovingRingData',
    title: '动环数据告警',
    component: markRaw(defineAsyncComponent(() => import('./module/MovingRingData.vue'))),
  },
  {
    keyword: 'FaultSystem',
    title: '集中故障系统告警',
    component: markRaw(defineAsyncComponent(() => import('./module/FaultSystem.vue'))),
  },
  {
    keyword: 'DynamicForecase',
    title: '告警阈值动态预测',
    component: markRaw(defineAsyncComponent(() => import('./module/DynamicForecase.vue'))),
  },
  {
    keyword: 'FaultDiagnosis',
    title: '故障诊断分析',
    component: markRaw(defineAsyncComponent(() => import('./module/FaultDiagnosis.vue'))),
  },
];
