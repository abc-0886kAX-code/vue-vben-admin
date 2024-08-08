<template>
  <div class="img-box">
    <a-upload
      v-model:file-list="fileList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      accept=".doc,.docx,.xml,.xlsx,.xls"
      @change="onHandleChange"
    >
      <a-button type="primary"> 选择文件 </a-button>
    </a-upload>
    <div class="not_select" v-if="onFlag()">未选中任何文件</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';

  const emit = defineEmits(['passList']);
  const fileList = ref([
    // {
    //   uid: '1',
    //   name: 'PixsoLocalFontSetupwin1 0 5文件',
    //   status: 'done',
    //   response: 'http://www.baidu.com',
    //   // custom error message to show
    //   url: 'http://www.baidu.com',
    // },
  ]);
  const onFlag = () => {
    if (fileList.value.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onHandleChange = (info: any) => {
    console.log(info, 'info');
    emit('previousPage', { info: info.fileList });
  };
</script>

<style scoped lang="less">
  .img-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
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
  .not_select {
    position: absolute;
    left: 100px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
  }
</style>
