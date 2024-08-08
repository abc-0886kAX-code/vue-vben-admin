<template>
  <div class="img-box">
    <a-upload
      v-model:file-list="fileList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      accept=".doc,.docx,.xml,.xlsx,.xls"
    >
      <a-button type="primary"> 选择文件 </a-button>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const fileList = ref([
    {
      uid: '1',
      name: 'PixsoLocalFontSetupwin1 0 5文件',
      status: 'done',
      response: 'http://www.baidu.com',
      // custom error message to show
      url: 'http://www.baidu.com',
    },
  ]);

  // throttle(onNextPage, 500);
</script>

<style scoped lang="less">
  .img-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  ::v-deep .ant-upload {
    margin-right: 12px;
  }

  ::v-deep .ant-upload-wrapper {
    display: flex;
    align-items: center;
  }

  ::v-deep .ant-upload-list {
    width: 100%;
    height: 70px !important;
    overflow-y: auto !important;
  }

  ::v-deep .ant-upload-list-item {
    height: 32px !important;
    font-size: 16px !important;
  }
</style>
