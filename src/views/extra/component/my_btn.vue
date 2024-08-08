<template>
  <div class="btn-box">
    <a-button type="primary" v-if="btnType == 'query'" @click="onDetermine">
      <template #icon>
        <SearchOutlined :style="btnIconStyle" />
      </template>
      <span :style="btnTextStyle">查询</span>
    </a-button>
    <a-button type="primary" ghost v-else-if="btnType == 'reset'" @click="onDetermine">
      <template #icon>
        <SyncOutlined :style="btnIconStyle" />
      </template>
      <span :style="btnTextStyle">重置</span>
    </a-button>
    <a-button type="primary" v-else-if="btnType == 'export'" @click="onDetermine">
      <template #icon>
        <CloudDownloadOutlined :style="btnIconStyle" />
      </template>
      <span :style="btnTextStyle">导出</span>
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import { SearchOutlined, SyncOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
  import { defineProps, defineEmits } from 'vue';

  const emit = defineEmits(['determine']);
  // 通过defineProps接收父组件的值
  // query 查询按钮
  // reset  重置按钮
  // export   导出按钮
  defineProps({
    btnType: { type: String, default: 'query' },
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
    width: 100%;
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
