<template>
  <div class="analysis-box">
    <div class="analysis-box-top">
      <div class="analysis-box-top-cake">
        <div class="my-title">
          <myTitle :titleData="'统计'" :titleType="'rectangle'" />
        </div>
        <div class="analysis-box-top-cake-box" id="echarts_box8"></div>
      </div>
      <div class="analysis-box-top-num">
        <div>
          <img src="@/assets/images/blind_young.png" />
          <div>U位盲板总数量</div>
          <div class="blind-plate young-text">100</div>
        </div>

        <div>
          <img src="@/assets/images/blind_green.png" />
          <div>已使用盲板</div>
          <div class="blind-plate green-text">60</div>
        </div>

        <div>
          <img src="@/assets/images/blind_blue.png" />
          <div>未使用盲板</div>
          <div class="blind-plate blue-text">40</div>
        </div>
      </div>
      <div class="analysis-box-top-fold" id="echarts_box9"></div>
    </div>
    <div class="analysis-box-bottom">
      <div class="analysis-box-bottom-query">
        <div class="analysis-box-bottom-query-from">
          <div class="my-title">
            <myTitle :titleData="'查询条件'" :titleType="'rectangle'" />
          </div>
          <div class="analysis-box-bottom-query-from-box">
            <!-- 查询条件表单 -->

            <div class="query-form-box">
              <div class="query-form-name">查询地点树:</div>
              <a-tree-select
                v-model:value="treeList"
                :style="treeStyle"
                :tree-data="treeData"
                tree-checkable
                allow-clear
                :show-checked-strategy="SHOW_PARENT"
                placeholder="请选择"
                tree-node-filter-prop="label"
              />
            </div>
            <div class="query-form-box">
              <div class="query-form-name">地点查询:</div>
              <a-select
                :style="selectStyle"
                :value="placeValue"
                placeholder="请选择告警级别"
                :options="placeOptions"
                @change="placeChange"
              />
            </div>
            <div class="query-form-box">
              <div class="query-form-name">时间查询:</div>
              <a-date-picker :style="selectStyle" :value="timeValue" format="YYYY-MM-DD" />
            </div>
          </div>
          <div class="analysis-box-bottom-query-from-btn">
            <!-- 查询条件按钮 -->
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
        <div class="analysis-box-bottom-query-from">
          <div class="my-title">
            <myTitle :titleData="'已选范围'" :titleType="'tit'" />
          </div>
          <div class="analysis-box-bottom-query-from-select">
            <div v-for="(item, index) in selectedRange" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="analysis-box-bottom-query-table">
          <div class="my-title">
            <myTitle :titleData="'查询列表'" :titleType="'list'" />
          </div>
          <div class="analysis-box-bottom-query-table-box" ref="queryScroll">
            <a-table
              class="ant-table-striped"
              :dataSource="queryList"
              :columns="columns"
              :scroll="{ y: queryScrollY }"
              rowKey="key"
            >
              <template #bodyCell="{ column, text, record, index }">
                <!-- 当前列是序号列时，显示序号 -->
                <span v-if="column.dataIndex === 'serialNumber'">{{ index + 1 }}</span>
                <!-- 其他列正常显示 -->
                <span v-else>{{ text }}</span>
                <template v-if="column.key === 'details'">
                  <div class="details-box" @click="detailsRow(record)">详情</div>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
      <div class="analysis-box-bottom-img">
        <div class="previous">
          <LeftOutlined @click="onPreviousPage('upper')" :style="iconStyle" />
        </div>
        <div class="analysis-box-bottom-img-center">
          <div class="analysis-box-bottom-img-center-box" ref="bannerBox">
            <a-carousel
              v-model="imgCurrent"
              :dots="false"
              :after-change="handleAfterChange"
              :arrows="false"
              ref="carousel"
            >
              <div v-for="item in imgTotal" :key="item">
                <a-image :height="bannerHeight + 'px'" :width="'100%'" :src="localImage" />
              </div>
            </a-carousel>
          </div>
          <div class="analysis-box-bottom-img-center-footer">
            <myPag :current="imgCurrent" :total="imgTotal" :flag="false" />
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
  import myTitle from '../../component/my_title.vue';
  import { detailOption, foldOption, getChart } from '../../echarts/detail_echarts';
  import { TreeSelect } from 'ant-design-vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { iconStyle, selectStyle, treeStyle } from '../../utils/my_style';
  import {
    LeftOutlined,
    RightOutlined,
    SearchOutlined,
    SyncOutlined,
    CloudDownloadOutlined,
  } from '@ant-design/icons-vue';
  import myPag from '../../component/my_pag.vue';
  import myBtn from '../../component/my_btn.vue';
  import localImage from '@/assets/images/cabinet.png';
  import {
    placeList,
    statisticsTreeData,
    onSelectedRange,
    queryHeader,
    onQueryList,
  } from '../../utils/simulation';

  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  // 定义统计图表颜色
  const pieColor = ['#17b9b8', '#ff8255', '#ff00f3', '#fb0065', '#ff941b'];
  // 定义统计图表饼图
  let cakeChart: any = null;
  // 配置统计图表文字的颜色样式
  const richColor = {};
  // 解析出统计图表的字体颜色
  const onpieColor = () => {
    pieColor.forEach((item, index) => {
      richColor[`d${index}`] = {
        fontSize: 18,
        color: item,
        align: 'left',
        padding: 4,
      };
      richColor[`hr${index}`] = {
        borderColor: item,
        width: '100%',
        borderWidth: 2,
        height: 0,
      };
    });
    richColor[`b`] = {
      fontSize: 18,
      color: '#4a5669',
      align: 'left',
      padding: 4,
    };
    detailOption.series[0].name = '盲板统计';
    detailOption.color = pieColor;
    detailOption.series[0].label.formatter = function (params) {
      return (
        '{b|' +
        params.name +
        '}\n{hr' +
        params.dataIndex +
        '|}\n{d' +
        params.dataIndex +
        '|' +
        params.value +
        '}'
      );
    };
    detailOption.series[0].label.rich = richColor;
    (detailOption.series[0].data = [
      { value: 41, name: '未使用盲板' },
      { value: 60, name: '使用盲板' },
    ]),
      (cakeChart = getChart('echarts_box8', detailOption));
  };

  // 定义统计图表折线图
  let foldChart: any = null;

  // 定义地点查询的文字
  const placeValue = ref<string>('');
  // 定义地点查询的列表
  const placeOptions = ref<any[]>(placeList);
  // 定义地点查询的方法
  const placeChange = (value: String, option: any) => {
    placeValue.value = option.label;
  };
  // 定义时间查询数据
  let timeValue = ref<string>('');
  // 定义查询地点树
  let treeList = ref<any[]>([]);
  // 定义树状选择的列表
  let treeData = statisticsTreeData;
  // 定义已选范围列表
  let selectedRange = ref<any[]>([]);
  // 定义列表数据
  let queryList = ref<any[]>([]);
  // 定义列表表头
  let columns = ref<any[]>(queryHeader);
  // 定义列表的id
  const queryScroll = ref<any>(null);
  // 定义列表的高度
  let queryScrollY = ref<number>(0);
  // 列表总条数
  let tableTotal = ref<number>(50);
  // 图片总条数
  let imgTotal = ref<number>(7);
  // 图片当前数
  let imgCurrent = ref<number>(0);
  const carousel = ref<any>(null); // 创建一个 ref 引用来获取 a-carousel 实例
  // 得到切换后的页码
  const handleAfterChange = (current) => {
    imgCurrent.value = current + 1;
  };

  // 定义切换
  const onPreviousPage = (rowType: string) => {
    if (rowType == 'upper') {
      carousel.value.prev();
    } else if (rowType == 'lower') {
      carousel.value.next();
    }
  };
  // 点击详情
  const detailsRow = (row: any) => {
    console.log(row, '==========');
  };

  let bannerHeight = ref<number>(0);
  let bannerBox = ref<any>(null);
  onMounted(() => {
    // 设置列表的高度
    if (queryScroll.value) {
      queryScrollY.value = queryScroll.value.offsetHeight - 120;
    }
    if (bannerBox.value) {
      bannerHeight.value = bannerBox.value.offsetHeight;
    }
    selectedRange.value = onSelectedRange(12);
    // 设置列表数据

    queryList.value = onQueryList(tableTotal.value);
    // 绘制统计图表
    onpieColor();
    foldChart = getChart('echarts_box9', foldOption);
  });
  onUnmounted(() => {
    cakeChart.dispose();
    cakeChart = null;
    foldChart.dispose();
    foldChart = null;
  });
</script>
<style scoped lang="less">
  @import '../../my_less/general.less';

  .analysis-box {
    width: 100%;
    height: 100%;
    background: #c7e6fb;

    &-top {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 35%;
      padding: 12px;
      border-radius: 5px;
      background: #fff;

      &-cake {
        width: 35%;
        height: 100%;

        &-box {
          width: 100%;
          height: calc(100% - 28px);
        }
      }

      &-num {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 350px;
        height: 80%;
        border-right: solid 1px #f1f3f6;
        border-left: solid 1px #f1f3f6;

        > div {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          width: 100%;
          height: 33%;
          padding: 0 12px;

          > img {
            width: 58px;
            height: 64px;
            margin-left: 8px;
          }

          > div {
            width: 64px;
            margin-left: 12px;
            color: #333;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
          }

          > .blind-plate {
            flex: 1;
            margin-left: 24px;
            font-size: 24px;
            font-weight: 700;
          }

          > .young-text {
            color: #96d4e8;
          }

          > .green-text {
            color: #6ae9c1;
          }

          > .blue-text {
            color: #56bae7;
          }
        }
      }

      &-fold {
        width: calc(65% - 400px);
        height: 100%;
      }
    }

    &-bottom {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: calc(65% - 10px);
      margin-top: 10px;
      padding: 12px;
      border-radius: 5px;
      background: #fff;

      &-query {
        width: 65%;
        height: 100%;

        &-from {
          display: flex;
          box-sizing: border-box;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 132px;

          &-box {
            display: flex;
            align-items: center;
            // justify-content: space-between;
            width: 100%;
            height: 48px;

            > div {
              display: flex;
              align-items: center;
              // justify-content: space-between;
              // width: 30%;
              height: 34px;
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

          &-select {
            display: flex;
            box-sizing: border-box;
            flex-wrap: wrap;
            width: 100%;
            height: calc(100% - 28px);
            padding: 4px 0;
            overflow-y: auto;

            > div {
              height: 28px;
              margin-right: 12px;
              margin-bottom: 8px;
              padding: 0 12px;
              border: solid 1px #17b9b8;
              border-radius: 22px;
              background: #17b9b8;
              color: #fff;
              font-size: 16px;
              line-height: 26px;
            }
          }

          &-select::-webkit-scrollbar {
            display: none;
          }
        }

        &-table {
          width: 100%;
          height: calc(100% - 264px);

          &-box {
            width: 100%;
            height: calc(100% - 28px);
          }
        }
      }

      &-img {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        width: 33%;
        height: 100%;
        border-left: solid 2px #f8f9fa;

        .previous {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 60px;
          height: 100%;
        }

        &-center {
          width: calc(100% - 120px);
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
          width: 60px;
          height: 100%;
        }
      }
    }
  }

  .details-box {
    cursor: pointer;
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
