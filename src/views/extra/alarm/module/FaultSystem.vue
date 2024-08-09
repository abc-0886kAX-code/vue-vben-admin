<template>
  <div class="fault-box">
    <div class="fault-box-top">
      <div class="fault-box-top-condition">
        <div class="my-title">
          <myTitle :titleData="'查询条件'" :titleType="'rectangle'" />
        </div>

        <div class="fault-box-top-condition-select">
          <div class="query-form-box">
            <div class="query-form-name">时间粒度:</div>
            <a-input :style="inputStyle" :value="granularityValue" placeholder="" />
          </div>
          <div class="query-form-box">
            <div class="query-form-name">动态阀值信度:</div>
            <a-input :style="inputStyle" :value="reliabilityValue" placeholder="" />
          </div>
          <div class="query-form-box">
            <div class="query-form-name">模型选择:</div>
            <a-select
              :value="modelValue"
              :style="selectStyle"
              placeholder="请选择模型"
              :options="modelOptions"
              @change="modelChange"
            />
          </div>
          <div class="query-form-box">
            <div class="query-form-name">时间范围:</div>
            <a-range-picker :style="pickerStyle" :value="scopeValue" />
          </div>
        </div>
        <div class="fault-box-top-condition-btn">
          <div class="use-btn">
            <myBtn :btnType="false" :btnName="'查询'">
              <SearchOutlined />
            </myBtn>
          </div>
          <div class="use-btn">
            <myBtn :btnType="true" :btnName="'重置'">
              <SyncOutlined />
            </myBtn>
          </div>
          <div class="use-btn">
            <myBtn :btnType="false" :btnName="'导出'">
              <CloudDownloadOutlined />
            </myBtn>
          </div>
        </div>
      </div>

      <div class="fault-box-top-explain">
        <div>
          <div class="my-title">
            <myTitle :titleData="'模型说明'" :titleType="'rectangle'" />
          </div>
          <div class="fault-box-top-explain-content">
            <description
              :descriptionText="'ARIMA模型适用于预测各种类型的时间序列数据，可以通过调整参数来捕捉不同类型的时间序列特征。'"
            />
          </div>
        </div>
        <div>
          <div class="my-title">
            <myTitle :titleData="'其他说明'" :titleType="'rectangle'" />
          </div>
          <div class="fault-box-top-explain-content">
            <description :descriptionText="'当前数据为数据1。'" />
          </div>
        </div>
      </div>
    </div>
    <div class="fault-box-bottom">
      <div class="my-title">
        <myTitle :titleData="'xxx预测图表'" :titleType="'circular'" />
      </div>
      <div class="fault-box-bottom-chart">
        <div class="previous">
          <LeftOutlined @click="onPreviousPage('upper')" :style="iconStyle" />
        </div>
        <div class="fault-box-bottom-chart-center">
          <div class="fault-box-bottom-chart-center-box" ref="bannerBox">
            <a-carousel
              v-model="currentPage"
              :dots="false"
              :after-change="handleAfterChange"
              :arrows="false"
              ref="carousel"
            >
              <div v-for="item in total" :key="item">
                <a-image :height="bannerHeight + 'px'" :width="'100%'" :src="faultImg" />
              </div>
            </a-carousel>
          </div>
          <div class="fault-box-bottom-chart-center-footer">
            <myPag :current="currentPage" :total="total" @previous-page="onPreviousPage" />
          </div>
        </div>
        <div class="next">
          <RightOutlined @click="onPreviousPage('lower')" :style="iconStyle" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import myTitle from '../../component/my_title.vue';
  import myPag from '../../component/my_pag.vue';
  import description from '../../component/description.vue';
  import {
    LeftOutlined,
    RightOutlined,
    SearchOutlined,
    SyncOutlined,
    CloudDownloadOutlined,
  } from '@ant-design/icons-vue';
  import { modelList } from '../../utils/simulation';
  import { iconStyle, selectStyle, inputStyle, pickerStyle } from '../../utils/my_style';
  import myBtn from '../../component/my_btn.vue';
  import faultImg from '@/assets/images/fault_charts.png';

  let currentPage = ref<number>(1);
  let total = ref<number>(6);
  const carousel = ref<any>(null); // 创建一个 ref 引用来获取 a-carousel 实例
  // 得到切换后的页码
  const handleAfterChange = (current) => {
    currentPage.value = current + 1;
  };
  // 定义切换
  const onPreviousPage = (rowType: string) => {
    if (rowType == 'upper') {
      carousel.value.prev();
    } else if (rowType == 'lower') {
      carousel.value.next();
    }
  };
  // 定义时间粒度
  let granularityValue = ref<string>('');
  // 定义动态阀值信度
  let reliabilityValue = ref<string>('');
  // 定义时间范围
  let scopeValue = ref<string>();
  // 定义下拉模型选择的文字
  const modelValue = ref<string>('');
  // 定义下拉模型选择的列表
  const modelOptions = ref<any[]>(modelList);
  // 定义下拉模型选择的方法
  const modelChange = (value: string, option: any) => {
    modelValue.value = option.label;
  };
  // 定义图片的高度
  let bannerHeight = ref<number>(0);
  // 图片父元素的Dom
  let bannerBox = ref<any>(null);
  onMounted(() => {
    if (bannerBox.value) {
      bannerHeight.value = bannerBox.value.offsetHeight;
    }
  });

  onUnmounted(() => {
    // faultChart.dispose();
    // faultChart = null;
  });
</script>
<style scoped lang="less">
  @import '../../my_less/general.less';

  .fault-box {
    width: 100%;
    height: 100%;
    background: #c7e6fb;

    &-top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 220px;

      &-condition {
        box-sizing: border-box;
        width: 60%;
        height: 100%;
        padding: 12px;
        border-radius: 5px;
        background: #fff;

        &-select {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: calc(100% - 80px);
          margin: 8px 0;
        }

        &-btn {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          height: 36px;
        }
      }

      &-explain {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(40% - 10px);
        height: 100%;

        > div {
          box-sizing: border-box;
          width: 100%;
          height: calc(50% - 5px);
          padding: 8px 12px;
          border-radius: 5px;
          background: #fff;

          > .fault-box-top-explain-content {
            width: 100%;
            height: calc(100% - 34px);
            margin-top: 6px;
          }
        }
      }
    }

    &-bottom {
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 230px);
      margin-top: 10px;
      padding: 12px;
      border-radius: 5px;
      background: #fff;

      > .my-title {
        box-sizing: border-box;
        height: 32px;
        border-bottom: solid 1px #e9f3fc;
      }

      &-chart {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: calc(100% - 32px);
        padding: 12px;

        .previous {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 80px;
          height: 100%;
        }

        &-center {
          width: calc(100% - 160px);
          height: 100%;

          &-box {
            width: 100%;
            height: calc(100% - 48px);
          }

          &-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 48px;
          }
        }

        .next {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 80px;
          height: 100%;
        }
      }
    }
  }
</style>
