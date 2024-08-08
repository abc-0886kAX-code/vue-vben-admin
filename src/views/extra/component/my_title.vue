<template>
  <div class="title-box">
    <div class="title-box-rectangle" v-if="titleType === 'rectangle'"> </div>
    <CheckCircleFilled :style="myStyle" v-else-if="titleType === 'tit'" />
    <TableOutlined :style="myStyle" v-else-if="titleType === 'list'" />

    <div class="title-box-circular" v-else></div>

    <div>{{ titleData }} </div>
  </div>
</template>

<script setup lang="ts">
  import { CheckCircleFilled, TableOutlined } from '@ant-design/icons-vue';
  // 通过defineProps接收父组件的值
  // rectangle 矩形竖边
  // circular  圆形竖边
  // tit   对号图标
  // list   查询列表
  defineProps({
    titleData: { type: String, default: '查询条件' },
    titleType: { type: String, default: 'rectangle' },
  });
  let myStyle: any = {
    color: '#5489e2',
    fontSize: '18px',
    marginRight: '8px',
    marginTop: '2px',
  };
</script>

<style scoped lang="less">
  .title-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    padding-left: 6px;
    box-sizing: border-box;

    &-rectangle {
      box-sizing: border-box;
      width: 3px;
      height: 14px;
      margin-right: 8px;
      background: #57a6ef;
    }

    &-circular {
      width: 16px;
      height: 16px;
      margin-right: 12px;
      border-radius: 16px;
      background: #5daaf1;
    }
  }
</style>
