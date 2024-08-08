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
              :descriptionText="'HDBSCAN能够自动根据数据的密度分布和连接性来确定聚类数量，无需用户预先指定聚类个数。'"
            />
          </div>
        </div>
        <div>
          <div class="my-title">
            <myTitle :titleData="'其他说明'" :titleType="'rectangle'" />
          </div>
          <div class="fault-box-top-explain-content">
            <description :descriptionText="'统一使用ERNIE1.0做词嵌入。'" />
          </div>
        </div>
      </div>
    </div>
    <div class="fault-box-bottom">
      <div class="fault-box-bottom-chart">
        <div class="my-title">
          <myTitle :titleData="'xxx预测图表'" :titleType="'circular'" />
        </div>

        <div class="fault-box-bottom-chart-box">
          <div class="previous">
            <LeftOutlined :style="iconStyle" />
          </div>
          <div class="fault-box-bottom-chart-box-center">
            <div class="fault-box-bottom-chart-box-center-box" id="echarts_box6"> </div>
            <div class="fault-box-bottom-chart-box-center-footer">
              <myPag :current="current" :total="total" @previous-page="onPreviousPage" />
            </div>
          </div>
          <div class="next">
            <RightOutlined :style="iconStyle" />
          </div>
        </div>
      </div>
      <div class="fault-box-bottom-right">
        <div>
          <div class="my-title">
            <myTitle :titleData="'信息面板'" :titleType="'rectangle'" />
          </div>
          <div class="img-box"> <img src="@/assets/images/info.png" /> </div>
        </div>
        <div>
          <div class="my-title">
            <myTitle :titleData="'其他业务分析'" :titleType="'rectangle'" />
          </div>
          <div class="other-box" id="echarts_box7"> </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, h, onMounted, onUnmounted } from 'vue';
  import myTitle from '../../component/my_title.vue';
  import description from '../../component/description.vue';
  import {
    SearchOutlined,
    SyncOutlined,
    CloudDownloadOutlined,
    LeftOutlined,
    RightOutlined,
  } from '@ant-design/icons-vue';
  import { scatterOption, otherOption, getChart } from '../../echarts/detail_echarts';
  import myPag from '../../component/my_pag.vue';
  import { iconStyle } from '../../utils/my_style';
  import { modelList } from '../../utils/simulation';

  let current = ref<number>(1);
  let total = ref<number>(6);
  const onPreviousPage = (row: any) => {
    current.value = row.current;
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
  // 散点图DOM
  let scatterChart: any = null;
  // 散点图数据
  let scatterData = ref<any[]>([]);
  // 自定义模拟散点图数据方法
  const generateScatterData = () => {
    const data: any = [];
    for (let i = 0; i < 100; i++) {
      data.push([
        Math.ceil(Math.random() * 1000), // x 轴值
        Math.ceil(Math.random() * 10000), // y 轴值
      ]);
    }
    scatterData.value = data;
    scatterOption.series[0].data = data;
    scatterChart = getChart('echarts_box6', scatterOption);
  };
  // 其他业务分析DOM
  let otherChart: any = null;

  onMounted(() => {
    // 绘制散点图图表
    generateScatterData();
    // 绘制其他业务分析图表
    otherChart = getChart('echarts_box7', otherOption);
  });

  onUnmounted(() => {
    scatterChart.dispose();
    otherChart.dispose();
    scatterChart = null;
    otherChart = null;
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
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: calc(100% - 232px);
      margin-top: 12px;

      &-chart {
        box-sizing: border-box;
        width: 60%;
        height: 100%;
        padding: 12px;
        border-radius: 12px;
        background: #fff;

        > .my-title {
          box-sizing: border-box;
          height: 32px;
          border-bottom: solid 1px #e9f3fc;
        }

        &-box {
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

              .next-page {
                box-sizing: border-box;
                width: 76px;
                height: 28px;
                border: solid 2px #e4e4e4;
                border-radius: 4px;
                color: #666;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                cursor: pointer;
              }

              .current-page {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 76px;
                height: 28px;

                &-left {
                  color: #358eec;
                  font-size: 16px;
                }

                &-center {
                  width: 12px;
                  color: #333;
                  font-size: 16px;
                  text-align: center;
                }

                &-right {
                  color: #333;
                  font-size: 16px;
                }
              }
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

      &-right {
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

          .img-box {
            box-sizing: border-box;
            width: 100%;
            height: calc(100% - 46px);
            margin-top: 12px;
            padding: 12px;

            > img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .other-box {
            width: 100%;
            height: calc(100% - 46px);
            margin-top: 12px;
          }
        }
      }
    }
  }
</style>
