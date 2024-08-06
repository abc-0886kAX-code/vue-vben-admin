<template>
  <div class="description-box">
    <div class="description-box-icon">
      <InfoCircleOutlined style="color: #1890ff; font-size: 16px" />
    </div>
    <div class="description-box-text">{{ descriptionText }}</div>
  </div>
</template>

<script setup lang="ts">
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  // 通过defineProps接收父组件的值
  defineProps({
    descriptionText: { type: String, default: '' },
  });
</script>

<style scoped lang="less">
  .description-box {
    // background: #000;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;

    &-icon {
      box-sizing: border-box;
      width: 24px;
      height: 24px;
      padding-top: 6px;
    }

    &-text {
      width: calc(100% - 24px);
      color: #5a6168;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .description-box::-webkit-scrollbar {
    display: none;
  }
</style>
