<template>
  <div class="fault-box">
    <div class="fault-box-top">
      <div class="fault-box-top-condition">
        <div class="my-title">
          <myTitle :titleData="'查询条件'" :titleType="'rectangle'" />
        </div>

        <div class="fault-box-top-condition-select">
          <div>
            <div class="query-form-name">时间粒度:</div>
            <div class="query-form-frame">
              <a-input :value="granularityValue" placeholder="" />
            </div>
          </div>
          <div>
            <div class="query-form-name">动态阀值信度:</div>
            <div class="query-form-frame">
              <a-input :value="reliabilityValue" placeholder="" />
            </div>
          </div>

          <div>
            <div class="query-form-name">模型选择:</div>
            <div class="query-form-frame">
              <a-select
                :value="modelValue"
                style="width: 100%"
                placeholder="请选择模型"
                :options="modelOptions"
                @change="modelChange"
              />
            </div>
          </div>
          <div>
            <div class="query-form-name">时间范围:</div>
            <div class="query-form-frame">
              <a-range-picker :value="scopeValue" />
            </div>
          </div>
        </div>
        <div class="fault-box-top-condition-btn">
          <div> <a-button :icon="h(SearchOutlined)" type="primary">查询</a-button></div>
          <div> <a-button :icon="h(SyncOutlined)" type="primary" ghost>重置</a-button></div>
          <div><a-button :icon="h(CloudDownloadOutlined)" type="primary">导出</a-button></div>
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
        <div class="previous"></div>
        <div class="fault-box-bottom-chart-center">
          <div class="fault-box-bottom-chart-center-box" id="echarts_box4"> </div>
          <div class="fault-box-bottom-chart-center-footer"> </div>
        </div>
        <div class="next"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, h, onMounted } from 'vue';
  import myTitle from '../component/my_title.vue';
  import description from '../component/description.vue';
  import { SearchOutlined, SyncOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
  import * as echarts from 'echarts';
  import 'echarts/lib/chart/line';

  // 定义时间粒度
  let granularityValue = ref<String>('');
  // 定义动态阀值信度
  let reliabilityValue = ref<String>('');
  // 定义时间范围
  let scopeValue = ref<String>();
  // 定义下拉模型选择的文字
  const modelValue = ref<String>('');
  // 定义下拉模型选择的列表
  const modelOptions = ref<Array>([
    {
      value: 'one',
      label: '一级',
    },
    {
      value: 'two',
      label: '二级',
    },
    {
      value: 'three',
      label: '三级',
    },
  ]);
  // 定义下拉模型选择的方法
  const modelChange = (value, option: Option | Array<Option>) => {
    modelValue.value = option.label;
  };

  let option = {
    title: {
      text: '示例置信图',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params: Object | Array) => {
        return params[0].seriesName + '\n' + params[0].value;
      },
    },
    legend: {
      data: ['基准线', '下限', '与上限的差值'],
    },
    xAxis: {
      type: 'category',
      data: [
        '2023-01',
        '2023-02',
        '2023-03',
        '2023-04',
        '2023-05',
        '2023-06',
        '2023-07',
        '2023-08',
        '2023-09',
        '2023-10',
        '2023-11',
        '2023-12',
      ],
    },
    yAxis: {
      type: 'value',
    },
    // [100, 140, 180, 160, 180, 140, 120, 100, 130, 110, 150, 140]
    series: [
      {
        name: '基准线',
        type: 'line',
        smooth: true,
        stack: '总量1',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        },
        lineStyle: {
          normal: {},
        },
        // data: [110, 142, 184, 165, 186, 143, 124, 105, 133, 111, 152, 137],
        data: [100, 140, 180, 160, 180, 140, 120, 100, 130, 110, 150, 140],
      },
      {
        name: '下限',
        type: 'line',
        stack: '总量',
        smooth: true,
        label: {
          normal: {
            show: true,
            position: 'bottom',
          },
        },
        emphasis: {
          focus: 'none', // 取消高亮效果
          scale: false,
          disabled: false,
        },
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 0,
          },
        },
        data: [98, 135, 178, 157, 177, 138, 116, 96, 127, 106, 144, 133],
        markArea: {
          label: {
            normal: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
            },
          },
          itemStyle: {
            normal: {
              color: '#000',
              opacity: 0.2,
            },
          },
        },
      },
      {
        name: '与上限的差值',
        type: 'line',
        smooth: true,
        stack: '总量',
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 0,
          },
        },
        emphasis: {
          focus: 'none', // 取消高亮效果
          scale: false,
          disabled: true,
        },
        areaStyle: {
          normal: {
            color: 'green',
            opacity: 0.1,
          },
        },
        data: [8, 9, 10, 12, 7, 8, 9, 14, 14, 14, 14, 12],
      },
    ],
  };
  let myChart = null;
  onMounted(() => {
    // 绘制告警时间图表
    myChart = echarts.init(document.getElementById('echarts_box4'));
    myChart.setOption(option);
  });
</script>
<style scoped lang="less">
  .fault-box {
    width: 100%;
    height: 100%;
    background: #c7e6fb;

    &-top {
      // background: #fff;
      // border-radius: 12px;
      // padding: 12px;
      // box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 220px;

      &-condition {
        box-sizing: border-box;
        width: 60%;
        height: 100%;
        padding: 12px;
        border-radius: 12px;
        background: #fff;

        &-select {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          height: calc(100% - 80px);
          margin: 8px 0;

          > div {
            // background: #000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 30%;
            min-height: 34px;

            > .query-form-name {
              width: 78px;
              min-height: 34px;
              color: #000;
              font-size: 16px;
              font-weight: 500;
              line-height: 28px;
            }

            > .query-form-frame {
              width: calc(100% - 78px);
              height: 34px;
            }
          }

          > div:last-of-type {
            width: 40%;
          }
        }

        &-btn {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          height: 36px;

          > div {
            margin-left: 12px;
          }
        }
      }

      &-explain {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(40% - 12px);
        height: 100%;

        > div {
          box-sizing: border-box;
          width: 100%;
          height: calc(50% - 6px);
          padding: 8px 12px;
          border-radius: 12px;
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
      height: calc(100% - 232px);
      margin-top: 12px;
      padding: 12px;
      border-radius: 12px;
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

  .my-title {
    width: 100%;
    height: 28px;
  }
</style>
