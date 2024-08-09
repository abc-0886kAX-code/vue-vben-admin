<template>
  <div class="btn-box">
    <a-button type="primary" :ghost="btnType" @click="onDetermine">
      <template #icon>
        <slot :style="btnIconStyle"></slot>
      </template>
      <span :style="btnTextStyle">{{ btnName }}</span>
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  const emit = defineEmits(['determine']);
  // 通过defineProps接收父组件的值
  // query 查询按钮
  // reset  重置按钮
  // export   导出按钮
  defineProps({
    btnType: { type: Boolean, default: false },
    btnName: { type: String, default: '查询' },
  });
  const btnIconStyle: any = {
    fontSize: '14px',
  };
  const btnTextStyle: any = {
    fontSize: '12px',
  };

  const onDetermine = () => {
    emit('determine');
  };
</script>

<style scoped lang="less">
  .btn-box {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 12px;
  }
  ::v-deep(.ant-btn-primary) {
    background: #518ce5;
  }
  ::v-deep(.ant-btn-background-ghost) {
    color: #518ce5;
    border-color: #518ce5;
  }
</style>
