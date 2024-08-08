import * as echarts from 'echarts';
// 定义告警详情echarts配置
const detailOption = {
  tooltip: {
    trigger: 'item',
  },
  color: ['#16b99a', '#4473ff', '#ff00f3', '#fb0065', '#ff941b'],
  legend: {
    top: '6px',
    left: 'center',
  },
  grid: {
    bottom: '0%',
    right: '2%',
    left: '6%',
    top: '0%',
  },
  series: [
    {
      name: '告警详情',
      type: 'pie',
      top: '32px',
      radius: ['45%', '95%'],
      avoidLabelOverlap: false,
      labelLine: {
        show: true,
        length: 20,
        length2: 20,
        lineStyle: {
          width: 2,
        },
      },
      label: {
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
        rich: {},
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

// 定义告警类型数量统计echarts配置
const typeOption = {
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
    left: '2%',
    right: '6%',
    bottom: '3%',
    top: '10%',
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
      data: [18203, 23489, 29034, 104970, 131744],
    },
    {
      name: '图例2',
      type: 'bar',
      itemStyle: {
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
      data: [19325, 23438, 31000, 121594, 134141],
    },
  ],
};

// 定义告警数量时间变化趋势echarts配置
const timeOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    bottom: '6%',
    right: '2%',
    left: '8%',
    top: '12%',
    // right: '12%',
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
        width: 4,
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
        width: 4,
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
        width: 4,
      },
      smooth: true,
    },
  ],
};

// 定义置信图图表数据
const faultOption = {
  title: {
    text: 'ARIMA Forecast with Sliding Window and Confidence Intervals',
    left: 'center',
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: (params) => {
      return params[0].seriesName + '\n' + params[0].value;
    },
  },
  legend: {
    show: false,
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
    splitLine: {
      show: false,
      lineStyle: {
        type: 'dashed',
        color: '#DDD',
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#dfe1e3',
        width: 2,
      },
    },
    axisLabel: {
      color: '#666666',
      fontSize: 14,
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        type: 'dashed',
        color: '#DDD',
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#dfe1e3',
        width: 2,
      },
    },
    axisLabel: {
      color: '#666666',
      fontSize: 14,
    },
  },
  // [100, 140, 180, 160, 180, 140, 120, 100, 130, 110, 150, 140]
  series: [
    {
      name: '基准线',
      type: 'line',
      smooth: true,
      stack: '总量1',
      showSymbol: false,
      label: {
        show: true,
        position: 'top',
      },
      lineStyle: {
        color: '#0f82ea',
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
        show: false,
        position: 'bottom',
      },
      emphasis: {
        focus: 'none', // 取消高亮效果
        scale: false,
        disabled: true,
      },
      showSymbol: false,
      lineStyle: {
        width: 0,
      },
      data: [98, 135, 178, 157, 177, 138, 116, 96, 127, 106, 144, 133],
      markArea: {
        label: {
          show: true,
          fontSize: 15,
          fontWeight: 'bold',
          color: '#000',
        },
        itemStyle: {
          color: '#000',
          opacity: 0.2,
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
        width: 0,
      },
      emphasis: {
        focus: 'none', // 取消高亮效果
        scale: false,
        disabled: true,
      },
      areaStyle: {
        color: '#e0f7fc',
        opacity: 0.8,
      },
      data: [8, 9, 10, 12, 7, 8, 9, 14, 14, 14, 14, 12],
    },
  ],
};

// 定义散点图配置
const scatterOption = {
  title: {
    text: '',
    left: 'center',
    top: 0,
  },
  grid: {
    left: '6%',
    right: '12%',
  },
  visualMap: {
    min: 0,
    max: 10000,
    dimension: 1,
    orient: 'vertical',
    right: 0,
    top: 'center',
    text: ['', ''],
    calculable: true,
    inRange: {
      color: ['#f2c31a', '#24b7f2'],
    },
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: [
    {
      type: 'value',
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'price-area',
      type: 'scatter',
      symbolSize: 5,
      data: [],
    },
  ],
};
// 其他业务分析柱状图
const otherOption = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  legend: {
    data: ['xx', '女性'],
    bottom: '0%',
    left: 'center',
    textStyle: {
      color: '#666666',
      fontSize: 16,
    },
    itemWidth: 14,
    itemHeight: 14,
    itemGap: 50,
  },
  xAxis: [
    {
      type: 'category',
      data: ['xx特征', 'xxx特征', 'xxxx特征'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#8e929b',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: '#8e929b',
        fontSize: 16,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#c7d0e0',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#f2f4f8',
          width: 2,
        },
      },
      axisLabel: {
        show: true,
        color: '#8e929b',
        fontSize: 14,
      },
    },
  ],
  series: [
    {
      name: 'xx',
      type: 'bar',
      data: [20, 50, 80],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: '#93dad8',
          },
          {
            offset: 0,
            color: '#36c1a9',
          },
        ]),
        opacity: 1,
      },
    },
    {
      name: '女性',
      type: 'bar',
      data: [80, 42, 66],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: '#8dbdf6',
          },
          {
            offset: 0,
            color: '#4675ff',
          },
        ]),
        opacity: 1,
      },
    },
  ],
};

// 定义盲板折线图
const foldOption = {
  title: {
    show: false,
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      // 自定义HTML内容，模拟渐变背景
      return `<div 
            style="
              background: linear-gradient(to right, #02a1f9, #16b9ba); 
              color: #fff; 
              padding:5px 10px;
              border-radius: 4px;
            ">  
                <p>${params[0].seriesName}：${params[0].value}</p> 
                <p>${params[1].seriesName}：${params[1].value}</p> 
          </div>`;
    },
    padding: [0, 0],
    borderColor: 'rgba(255,255,255,0)',
  },
  legend: {
    right: 20,
    // orient: 'vertical',
    textStyle: {
      //图例文字的样式
      color: ['rgba(83, 224, 51,0.8)', 'rgba(82, 172, 183,0.8)'],
    },
    data: ['区域1', '区域2'],
  },
  xAxis: {
    type: 'category',
    data: [
      '00:00',
      '2:00',
      '4:00',
      '6:00',
      '8:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
    ],
    boundaryGap: false,
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#f1f1f1',
      },
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14,
        color: '#aba8a8',
      },
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: ['#f1f1f1'],
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14,
        color: '#aba8a8',
      },
    },
  },
  series: [
    {
      name: '区域1',
      type: 'line',
      symbol: 'circle',
      symbolSize: 6,
      data: [
        '1200',
        '1400',
        '1008',
        '1411',
        '1026',
        '1288',
        '1300',
        '800',
        '1100',
        '1000',
        '1118',
        '1322',
      ],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 1,
                color: 'rgba(83, 224, 51,0.1)',
              },
              {
                offset: 0,
                color: 'rgba(83, 224, 51,0.5)',
              },
            ],
            false,
          ),
        },
      },
      itemStyle: {
        normal: {
          color: 'rgba(83, 224, 51,0.8)',
        },
      },
      lineStyle: {
        normal: {
          width: 3,
        },
      },
    },
    {
      name: '区域2',
      type: 'line',
      symbol: 'circle',
      symbolSize: 6,
      data: [
        '1200',
        '1400',
        '808',
        '811',
        '626',
        '488',
        '1600',
        '1100',
        '500',
        '300',
        '1998',
        '822',
      ],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 1,
                color: 'rgba(82, 172, 183,0.1)',
              },
              {
                offset: 0,
                color: 'rgba(82, 172, 183,0.5)',
              },
            ],
            false,
          ),
        },
      },
      itemStyle: {
        normal: {
          color: 'rgba(82, 172, 183,0.8)',
        },
      },
      lineStyle: {
        normal: {
          width: 3,
        },
      },
    },
  ],
};

function getChart(myBox: string, option: Object) {
  let myChart: any = null;
  myChart = echarts.init(document.getElementById(myBox));
  myChart.setOption(option);
  return myChart;
}

export {
  detailOption,
  typeOption,
  timeOption,
  faultOption,
  scatterOption,
  otherOption,
  foldOption,
  getChart,
};
