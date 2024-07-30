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
  import { ref, h, onMounted } from 'vue';
  import myTitle from '../component/my_title.vue';
  import { SearchOutlined, SyncOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
  import * as echarts from 'echarts';
  import { exportExcel } from '../utils/tool.js';

  // 定义告警详情图表颜色
  let pieColor = ['#16b99a', '#4473ff', '#ff00f3', '#fb0065', '#ff941b'];
  let richColor = {};

  // 定义下拉选择的文字
  const levelValue = ref<String>('');
  // 定义下拉选择的列表
  const levelOptions = ref<Array>([
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
  // 定义下拉选择的方法
  const levelChange = (value, option: Option | Array<Option>) => {
    levelValue.value = option.label;
  };
  // 定义告警时间
  let timeValue = ref<String>('');
  // 定义告警其他
  let otherValue = ref<String>('');

  // 分页数据
  // let pages = ref<Object>({
  //   current: 1,
  //   pageSize: 10,
  // });
  // 总条数
  let total = ref<Number>(100);
  // 分页方法
  // const pageChange1 = (page, pageSize) => {
  //   pages.value.current = page;
  //   pages.value.pageSize = pageSize;
  // };

  // 定义列表数据
  let dataSource = ref<Array>([]);
  // 定义列表表头
  let columns = ref<Array>([
    {
      title: '告警所属数据中心',
      dataIndex: 'core',
      key: 'core',
    },
    {
      title: '告警信息',
      dataIndex: 'information',
      key: 'information',
    },
    {
      title: '告警等级',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '告警xxx',
      dataIndex: 'alarm1',
      key: 'alarm1',
    },
    {
      title: '告警位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '告警xxx',
      dataIndex: 'alarm2',
      key: 'alarm2',
    },
    {
      title: '告警xxx',
      dataIndex: 'alarm3',
      key: 'alarm3',
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
    },
  ]);
  // 定义列表的id
  const scrollBox = ref(null);
  // 定义列表的高度
  let scrollY = ref<Number>(770);

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
  };

  // 定义告警详情图标数据
  let detailChart = null;
  let detailOption = {
    tooltip: {
      trigger: 'item',
    },
    color: pieColor,
    legend: {
      bottom: '3%',
      left: 'center',
    },
    series: [
      {
        name: '告警详情',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        labelLine: {
          normal: {
            show: true,
            length: 20,
            length2: 20,
            lineStyle: {
              width: 2,
            },
          },
        },
        label: {
          normal: {
            formatter: function (params) {
              return (
                '{b|' +
                params.name +
                '}\n{hr' +
                params.dataIndex +
                '|}\n{d' +
                params.dataIndex +
                '|' +
                params.percent +
                '%}'
              );
            },
            rich: richColor,
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },

        data: [
          { value: 1048, name: '告警级别1' },
          { value: 735, name: '告警级别2' },
        ],
      },
    ],
  };
  // 定义告警类型图标数据
  let typeChart = null;
  let typeOption = {
    title: {
      show: false,
      text: '告警类型',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['图例1', '图例2'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: ['告警类型1', '告警类型2', '告警类型3', '告警类型4', '告警类型5'],
    },
    series: [
      {
        name: '图例1',
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#b4e3e8',
              },
              {
                offset: 1,
                color: '#1ec5a7',
              },
            ]),
          },
        },
        data: [18203, 23489, 29034, 104970, 131744],
      },
      {
        name: '图例2',
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#96c7f4',
              },
              {
                offset: 1,
                color: '#3794ea',
              },
            ]),
          },
        },
        data: [19325, 23438, 31000, 121594, 134141],
      },
    ],
  };
  // 定义告警时间图标数据
  let timeChart = null;
  let timeOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      color: ['#16ea76', '#58c6ff', '#ff8256'],
      data: ['xx', 'xxx', 'xxxx'],
      left: 'center',
      top: 'top',

      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: '14',
      },
    },
    // grid: {
    //   top: 'middle',
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   height: '80%',
    //   containLabel: true,
    // },
    xAxis: {
      type: 'category',
      data: [
        '01月',
        '02月',
        '03月',
        '04月',
        '05月',
        '06月',
        '07月',
        '08月',
        '09月',
        '10月',
        '11月',
        '12月',
      ],
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
    },
    yAxis: {
      type: 'value',

      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#DDD',
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#333',
        },
      },
      nameTextStyle: {
        color: '#999',
      },
      splitArea: {
        show: false,
      },
    },
    series: [
      {
        name: 'xx',
        type: 'line',
        data: [800, 900, 220, 130, 660, 289, 800, 900, 220, 130, 660, 289],
        color: '#16ea76',
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 4,
          },
        },
        smooth: true,
      },
      {
        name: 'xxx',
        type: 'line',
        showSymbol: false,
        data: [123, 568, 111, 222, 123, 56, 123, 568, 111, 222, 123, 56],
        color: '#58c6ff',
        lineStyle: {
          normal: {
            width: 4,
          },
        },
        smooth: true,
      },
      {
        name: 'xxxx',
        type: 'line',
        color: '#ff8256',
        showSymbol: false,
        data: [125, 568, 25, 36, 784, 56, 125, 568, 25, 36, 784, 56],
        lineStyle: {
          normal: {
            width: 4,
          },
        },
        smooth: true,
      },
    ],
  };
  // 定义下拉选择的文字
  const yearValue = ref<String>('2023');
  // 定义下拉选择的列表
  const yearOptions = ref<Array>([
    {
      value: '2023',
      label: '2023年',
    },
    {
      value: '2022',
      label: '2022年',
    },
    {
      value: '2021',
      label: '2021年',
    },
  ]);
  // 定义下拉选择的方法
  const yearChange = (value, option: Option | Array<Option>) => {
    yearValue.value = option.label;
    timeChart.setOption(timeOption);
  };

  const downloadExcel = (data, filename = 'export.xlsx') => {
    const titleArr = [
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
    let arr = [];
    for (let i = 0; i < total.value; i++) {
      arr.push({
        key: i,
        core: 'xxxx数据中心',
        information: 'xx信息',
        grade: '一级',
        alarm1: 'xxxx1',
        location: '数据机房',
        alarm2: 'xxx报警',
        alarm3: 'xxxx2',
        status: '未处理',
      });
    }
    dataSource.value = arr;

    // 绘制告警详情图表
    onpieColor();
    detailChart = echarts.init(document.getElementById('echarts_box1'));
    detailChart.setOption(detailOption);
    // 绘制告警类型图表
    typeChart = echarts.init(document.getElementById('echarts_box2'));
    typeChart.setOption(typeOption);
    // 绘制告警时间图表
    timeChart = echarts.init(document.getElementById('echarts_box3'));
    timeChart.setOption(timeOption);
  });
</script>

<style scoped lang="less">
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
            // background: #000;
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

  .my-title {
    width: 100%;
    height: 28px;
  }
</style>
<style>
  .ant-table-row:nth-child(2n) {
    background-color: #f9f9fa !important;
    color: #6a6969 !important;
  }

  .ant-table-thead > tr > th {
    background-color: #f0f8fc !important;
  }
</style>
