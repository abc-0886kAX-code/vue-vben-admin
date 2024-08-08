<template>
  <div class="moving-box">
    <div class="moving-box-left">
      <div class="moving-box-left-query">
        <div class="my-title">
          <myTitle :titleData="'查询条件'" :titleType="'rectangle'" />
        </div>
        <div class="moving-box-left-query-form">
          <!-- 查询条件表单 -->
          <div>
            <div class="query-form-name">告警级别:</div>
            <div class="query-form-frame">
              <a-select
                :value="levelValue"
                style="width: 100%"
                placeholder="请选择告警级别"
                :options="levelOptions"
                @change="levelChange"
              />
            </div>
          </div>
          <div>
            <div class="query-form-name">告警时间:</div>
            <div class="query-form-frame">
              <a-date-picker
                :value="timeValue"
                format="YYYY-MM-DD HH:mm:ss"
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
              />
            </div>
          </div>
          <div>
            <div class="query-form-name">其他:</div>
            <div class="query-form-frame">
              <a-input :value="otherValue" placeholder="" />
            </div>
          </div>
        </div>
        <div class="moving-box-left-query-btn">
          <!-- 查询条件按钮 -->
          <div> <a-button :icon="h(SearchOutlined)" type="primary">查询</a-button></div>
          <div> <a-button :icon="h(SyncOutlined)" type="primary" ghost>重置</a-button></div>
        </div>
      </div>
      <div class="moving-box-left-list">
        <div class="my-title">
          <myTitle :titleData="'告警列表'" :titleType="'circular'" />
        </div>
        <div class="moving-box-left-list-export">
          <a-button
            :icon="h(CloudDownloadOutlined)"
            type="primary"
            @click="downloadExcel(dataSource)"
            >导出</a-button
          >
        </div>
        <div class="moving-box-left-list-box" ref="scrollBox">
          <a-table
            class="ant-table-striped"
            :dataSource="dataSource"
            :columns="columns"
            rowKey="key"
            :scroll="{ y: scrollY }"
          />
        </div>
        <!-- <div class="moving-box-left-list-pag">
          <a-pagination
            :current="pages.current"
            :page-size="pages.pageSize"
            :total="total"
            :show-total="(total) => `共${total}条`"
            @change="pageChange1"
          />
        </div> -->
      </div>
    </div>
    <div class="moving-box-right">
      <div class="moving-box-right-detail">
        <div class="my-title">
          <myTitle :titleData="'告警详情'" :titleType="'rectangle'" />
        </div>
        <div class="moving-box-right-detail-box" id="echarts_box1"></div>
      </div>
      <div class="moving-box-right-detail">
        <div class="my-title">
          <myTitle :titleData="'告警类型数量统计'" :titleType="'rectangle'" />
        </div>
        <div class="moving-box-right-detail-box" id="echarts_box2"></div>
      </div>
      <div class="moving-box-right-detail">
        <div class="my-title">
          <myTitle :titleData="'告警数量时间变化趋势'" :titleType="'rectangle'" />
        </div>
        <div class="moving-box-right-detail-box" id="echarts_box3"></div>
        <div class="moving-box-right-detail-select">
          <a-select
            :value="yearValue"
            style="width: 100%"
            placeholder="请选择告警级别"
            :options="yearOptions"
            @change="yearChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';
  import { ref, h, onMounted, onUnmounted } from 'vue';
  import myTitle from '../../component/my_title.vue';
  import { SearchOutlined, SyncOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
  import { exportExcel } from '../../utils/tool';
  import { levelList, alarmHeader, trendList, simulateAlarmList } from '../../utils/simulation';
  import { detailOption, typeOption, timeOption, getChart } from '../../echarts/detail_echarts';
  // 定义告警详情图表颜色
  const pieColor = ['#16b99a', '#4473ff', '#ff00f3', '#fb0065', '#ff941b'];
  // 配置告警详情文字的颜色样式
  const richColor = {};
  // 定义下拉选择的文字
  const levelValue = ref<string>('');
  // 定义下拉选择的列表
  const levelOptions = ref<any[]>(levelList);
  // 定义下拉选择的方法
  const levelChange = (value: String, option: any) => {
    levelValue.value = option.label;
  };
  // 定义告警时间
  let timeValue = ref<string>('');
  // 定义告警其他
  let otherValue = ref<string>('');

  // 分页数据
  // let pages = ref<Object>({
  //   current: 1,
  //   pageSize: 10,
  // });
  // 总条数
  let total = ref<number>(100);
  // 分页方法
  // const pageChange1 = (page, pageSize) => {
  //   pages.value.current = page;
  //   pages.value.pageSize = pageSize;
  // };

  // 定义列表数据
  let dataSource = ref<any[]>([]);
  // 定义列表表头
  let columns = ref<any[]>(alarmHeader);
  // 定义列表的id
  const scrollBox = ref<any>(null);
  // 定义列表的高度
  let scrollY = ref<number>(0);

  // 解析出告警详情图表的字体颜色
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
    detailOption.color = pieColor;
    detailOption.series[0].label.rich = richColor;
    detailOption.series[0].name = '告警详情';
    (detailOption.series[0].data = [
      { value: 1048, name: '告警级别1' },
      { value: 735, name: '告警级别2' },
    ]),
      (detailChart = getChart('echarts_box1', detailOption));
  };

  // 定义告警详情图标数据
  let detailChart: any = null;

  // 定义告警类型图标数据
  let typeChart: any = null;

  // 定义告警时间图标数据
  let timeChart: any = null;

  // 定义下拉选择的文字
  const yearValue = ref('2023');
  // 定义下拉选择的列表
  const yearOptions = ref<any[]>(trendList);
  // 定义下拉选择的方法
  const yearChange = (value: String, option: any) => {
    yearValue.value = option.label;
    timeOption.series[0].data = [289, 660, 130, 220, 900, 800, 800, 900, 220, 130, 660, 289];
    timeChart.setOption(timeOption);
  };

  const downloadExcel = (data: any[], filename: string = 'export.xlsx') => {
    const titleArr: any = [
      '序号',
      '告警所属数据中心',
      '告警信息',
      '告警等级',
      '告警xxx',
      '告警位置',
      '告警xxx',
      '告警xxx',
      '处理状态',
    ];
    exportExcel(data, filename, titleArr, filename);
  };
  onMounted(() => {
    // 设置列表的高度
    if (scrollBox.value) {
      scrollY.value = scrollBox.value.offsetHeight - 100;
    }
    // 设置列表数据
    dataSource.value = simulateAlarmList(total.value);

    // 绘制告警详情图表
    onpieColor();

    // 绘制告警类型图表
    typeChart = getChart('echarts_box2', typeOption);
    // 绘制告警时间图表
    timeChart = getChart('echarts_box3', timeOption);
  });
  onUnmounted(() => {
    detailChart.dispose();
    typeChart.dispose();
    timeChart.dispose();
    detailChart = null;
    typeChart = null;
    timeChart = null;
  });
</script>

<style scoped lang="less">
  @import '../../my_less/general.less';

  .moving-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: #c7e6fb;

    &-left {
      width: 60%;
      height: 100%;

      &-query {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 150px;
        padding: 12px;
        border-radius: 12px;
        background: #fff;

        &-form {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 48px;

          > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 30%;
            height: 34px;

            > .query-form-name {
              width: 78px;
              height: 34px;
              color: #000;
              font-size: 16px;
              font-weight: 500;
              line-height: 34px;
            }

            > .query-form-frame {
              width: calc(100% - 78px);
              height: 34px;
            }
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

      &-list {
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - 162px);
        margin-top: 12px;
        padding: 12px;
        border-radius: 12px;
        background: #fff;

        > .my-title {
          box-sizing: border-box;
          height: 32px;
          border-bottom: solid 1px #e9f3fc;
        }

        &-export {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          height: 36px;
          margin: 12px 0;
        }

        &-box {
          width: 100%;
          height: calc(100% - 134px);
        }

        &-pag {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 50px;
        }
      }
    }

    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 39%;
      height: 100%;
      margin-left: 1%;

      &-detail {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 32%;
        padding: 12px;
        border-radius: 12px;
        background: #fff;

        &-box {
          width: 100%;
          height: calc(100% - 32px);
        }

        &-select {
          position: absolute;
          z-index: 9;
          top: 32px;
          right: 5%;
          width: 100px;
          height: 36px;
        }
      }
    }
  }

  ::v-deep .ant-table-row:nth-child(2n) {
    background-color: #f9f9fa !important;
    color: #6a6969 !important;
  }

  ::v-deep .ant-table-thead > tr > th {
    background-color: #f0f8fc !important;
  }
</style>
