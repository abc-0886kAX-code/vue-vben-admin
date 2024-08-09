<template>
  <div class="monitor-box">
    <div class="monitor-box-artificial">
      <div class="my-title">
        <myTitle :titleData="'人工导入'" :titleType="'rectangle'" />
      </div>

      <div class="monitor-box-artificial-from">
        <div class="query-form-box">
          <div class="query-form-name">请选择地点树:</div>
          <a-tree-select
            v-model:value="treeList"
            :style="treeStyle"
            :tree-data="treeData"
            allow-clear
            placeholder="请选择"
            @select="myHandleSelect"
          />
        </div>

        <div class="query-form-box">
          <div class="query-form-name">请选择机柜:</div>
          <a-select
            :style="selectStyle"
            :value="cabinetValue"
            placeholder="请选择告警级别"
            :options="cabinetOptions"
            @change="cabinetChange"
          />
        </div>

        <div class="query-form-box">
          <div class="query-form-name">设置置信度:</div>
          <a-select
            :style="selectStyle"
            :value="confidenceValue"
            placeholder="请选择置信度"
            :options="confidenceOptions"
            @change="confidenceChange"
          />
        </div>

        <div class="query-form-box">
          <div class="query-form-name">设置IOU:</div>
          <a-select
            :style="selectStyle"
            :value="IOUValue"
            placeholder="请选择IOU"
            :options="IOUOptions"
            @change="IOUChange"
          />
        </div>

        <div class="query-form-upload">
          <div class="query-form-upload-name">导入模版样例:</div>
          <div class="query-form-upload-frame"><myUnloadFile /> </div>
        </div>
      </div>

      <div class="monitor-box-artificial-list">
        <div class="monitor-box-artificial-list-img"><myUnloadImg /> </div>
        <div class="monitor-box-artificial-list-btn">
          <!-- <a-button :icon="h(ScanOutlined)"  type="primary" @click="onStartIdentify"
            >开始识别</a-button
          > -->
          <myBtn :btnType="false" :btnName="'开始识别'" @determine="onStartIdentify">
            <ScanOutlined />
          </myBtn>
        </div>
      </div>
    </div>
    <div class="monitor-box-distinguish">
      <div class="monitor-box-distinguish-title">
        <div class="monitor-box-distinguish-title-box">
          <div class="my-title">
            <myTitle :titleData="'导入识别'" :titleType="'rectangle'" />
          </div>
        </div>
        <div class="monitor-box-distinguish-title-export">
          <!-- <a-button :icon="h(CloudDownloadOutlined)" type="primary">导出</a-button> -->
          <myBtn :btnType="false" :btnName="'导出'">
            <CloudDownloadOutlined />
          </myBtn>
        </div>
      </div>
      <div class="monitor-box-distinguish-table" ref="importScroll">
        <a-table
          class="ant-table-striped"
          :dataSource="importList"
          :pagination="false"
          :columns="columns"
          :scroll="{ y: importScrollY }"
          rowKey="key"
        >
          <template #bodyCell="{ column, text, record, index }">
            <span v-if="column.dataIndex === 'serialNumber'">{{ index + 1 }}</span>
            <template v-if="column.key === 'picture'">
              <img class="table-img" :src="text" />
              <!-- <a-image class="table-img" :src="text" ref="dom" /> -->
            </template>
            <template v-if="column.key === 'operation'">
              <DeleteOutlined :style="deleteStyle" @click="deleteRow(record)" />
            </template>
          </template>
        </a-table>
      </div>

      <div class="monitor-box-distinguish-footer">
        <myBtn :btnType="false" :btnName="'提交'">
          <FileAddOutlined />
        </myBtn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import myTitle from '../../component/my_title.vue';
  import { ref, onMounted } from 'vue';
  import {
    ScanOutlined,
    CloudDownloadOutlined,
    FileAddOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue';
  import myUnloadImg from '../../component/my_unload_img.vue';
  import myUnloadFile from '../../component/my_unload_file.vue';
  import { deleteStyle, selectStyle, treeStyle } from '../../utils/my_style';
  import myBtn from '../../component/my_btn.vue';
  import localImage from '@/assets/images/cabinet.png';
  import {
    manualTreeData,
    confidenceList,
    IOUList,
    distinguishHeader,
    onDistinguishList,
  } from '../../utils/simulation';
  // 定义查询地点树
  let treeList = ref<string>('');
  /*  定义查询地点树列表数据
       只能选中机房那一层
       机柜的下拉框数据是由列表中cabinetChildren传过去的
  */
  let treeData = manualTreeData;

  // 定义选择机柜的文字
  const cabinetValue = ref<string>('');
  // 定义选择机柜的列表
  const cabinetOptions = ref<any[]>([]);
  // 定义选择机柜的方法
  const cabinetChange = (value: String, option: any) => {
    cabinetValue.value = option.label;
  };
  // 定义选择置信度的文字
  const confidenceValue = ref<string>('');
  // 定义选择置信度的列表
  const confidenceOptions = ref<any[]>(confidenceList);
  // 定义选择置信度的方法
  const confidenceChange = (value: String, option: any) => {
    confidenceValue.value = option.label;
  };

  // 定义选择IOU的文字
  const IOUValue = ref<string>('');
  // 定义选择IOU的列表
  const IOUOptions = ref<any[]>(IOUList);
  // 定义选择IOU的方法
  const IOUChange = (value: String, option: any) => {
    IOUValue.value = option.label;
  };

  // 定义列表数据
  let importList = ref<any[]>([]);
  // 定义列表表头
  let columns = ref<any[]>(distinguishHeader);
  // 定义列表的id
  const importScroll = ref<any>(null);
  // 定义列表的高度
  let importScrollY = ref<number>(0);
  // 定义判断是否是机房那一层的函数，如果是给机柜的下拉框赋值
  const myHandleSelect = (value: string, node: any) => {
    // 通过 node.children 判断是否为最后一层节点
    cabinetOptions.value = [];
    cabinetValue.value = '';
    if (node.children && node.children.length > 0) {
      treeList.value = '';
    } else if (node.cabinetChildren && node.cabinetChildren.length > 0) {
      cabinetOptions.value = node.cabinetChildren;
    }
  };
  // 删除当前这一条数据
  const deleteRow = (row: any) => {
    console.log(row, '===========');
    importList.value = importList.value.filter((item) => item.key !== row.key);
  };
  const onStartIdentify = () => {
    console.log('开始识别');
    importList.value = [];
    // 设置列表数据
    importList.value = onDistinguishList(50, localImage);
  };
  onMounted(() => {
    // 设置列表的高度
    if (importScroll.value) {
      importScrollY.value = importScroll.value.offsetHeight - 100;
    }
  });
</script>
<style scoped lang="less">
  @import '../../my_less/general.less';

  .monitor-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: #c7e6fb;

    &-artificial {
      box-sizing: border-box;
      width: calc(50% - 5px);
      height: 100%;
      padding: 12px;
      border-radius: 5px;
      background: #fff;

      &-from {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 188px;
        margin-top: 12px;
        border-bottom: solid 1px #eff2f3;

        > div {
          display: flex;
          align-items: center;
          height: 34px;
        }

        > .query-form-upload {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 80px;

          > .query-form-upload-name {
            width: 100px;
            height: 34px;
            color: #000;
            font-size: 16px;
            font-weight: 500;
            line-height: 34px;
          }

          > .query-form-upload-frame {
            width: calc(100% - 110px);
            height: 100%;
          }
        }
      }

      &-list {
        width: 100%;
        height: calc(100% - 244px);
        margin-top: 12px;

        &-img {
          box-sizing: border-box;
          width: 100%;
          height: calc(100% - 56px);
          padding-top: 12px;
        }

        &-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 56px;
        }
      }
    }

    &-distinguish {
      box-sizing: border-box;
      width: calc(50% - 5px);
      height: 100%;
      padding: 12px;
      border-radius: 5px;
      background: #fff;

      &-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 48px;
        margin-bottom: 12px;

        &-export {
          display: flex;
          align-items: flex-end;
          width: 100px;
          height: 48px;
        }

        &-box {
          width: calc(100% - 100px);
          height: 48px;
        }
      }

      &-table {
        width: 100%;
        height: calc(100% - 112px);
      }

      &-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 48px;
      }
    }
  }

  .table-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  ::v-deep(.ant-select-selector) {
    max-height: 64px !important;
    overflow: auto !important;
  }
  ::v-deep(.ant-table-row:nth-child(2n)) {
    background-color: #f9fbfd !important;
    color: #333333 !important;
    font-size: 14px !important;
  }
  ::v-deep(.ant-table-thead > tr > th) {
    background-color: #f0f8fc !important;
    color: #000000 !important;
    font-size: 16px !important;
    font-weight: 500 !important;
  }
  ::v-deep(.ant-table-pagination) {
    margin-top: 20px !important;
  }
</style>
