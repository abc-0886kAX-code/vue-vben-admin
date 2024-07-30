<template>
  <div class="title-box">
    <div class="title-box-rectangle" v-if="getType()"> </div>
    <div class="title-box-circular" v-else></div>
    <div>{{ titleData }} </div>
  </div>
</template>

<script setup lang="ts">
  // 通过defineProps接收父组件的值
  // rectangle 矩形竖边
  // circular  圆形竖边
  let props = defineProps({
    titleData: { type: String, default: '查询条件' },
    titleType: { type: String, default: 'rectangle' },
  });

  const getType = () => {
    if (props.titleType === 'rectangle') {
      return true;
    } else {
      return false;
    }
  };
</script>

<style scoped lang="less">
  .title-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #000;
    font-size: 16px;
    font-weight: 600;

    &-rectangle {
      box-sizing: border-box;
      width: 6px;
      height: 18px;
      margin-right: 12px;
      border-right: solid 1px #87c0f5;
      border-left: solid 1px #87c0f5;
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
