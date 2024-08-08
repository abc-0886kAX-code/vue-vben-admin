// 模拟的数据和定义列表的头部
// 模拟动环数据告警页面-告警级别数据
const levelList = [
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
];
// 模拟动环数据告警页面-告警列表表格头
const alarmHeader = [
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
];
// 模拟动环数据告警页面-告警数量时间变化趋势
const trendList = [
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
];
// 利用循环制造告警列表中的假数据
function simulateAlarmList(total) {
  const arr: any = [];
  for (let i: any = 0; i < total; i++) {
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
  return arr;
}
// 模拟集中故障系统告警页面-模型选择数据与 告警阀值动态预测页面-模型选择
const modelList = [
  {
    value: 'one',
    label: '模型一',
  },
  {
    value: 'two',
    label: '模型二',
  },
  {
    value: 'three',
    label: '模型三',
  },
];
// 模拟盲板统计分析页面-地点查询数据
const placeList = [
  {
    value: 'one',
    label: '贵安1',
  },
  {
    value: 'two',
    label: '贵安2',
  },
  {
    value: 'three',
    label: '贵安3',
  },
];
// 模拟盲板统计分析页面-查询地点树数据
const statisticsTreeData = [
  {
    label: '机楼1',
    value: '0',
    children: [
      {
        label: '机房1-1',
        value: '0-0',
        children: [
          {
            label: '机柜1-1-1',
            value: '0-0-0',
          },
          {
            label: '机柜1-1-2',
            value: '0-0-1',
          },
          {
            label: '机柜1-1-3',
            value: '0-0-3',
          },
          {
            label: '机柜1-1-4',
            value: '0-0-4',
          },
        ],
      },
      {
        label: '机房1-2',
        value: '0-1',
        children: [
          {
            label: '机柜1-2-1',
            value: '0-1-0',
          },
          {
            label: '机柜1-2-2',
            value: '0-1-1',
          },
          {
            label: '机柜1-2-3',
            value: '0-1-3',
          },
        ],
      },
    ],
  },
  {
    label: '机楼2',
    value: '1',
    children: [
      {
        label: '机房2-1',
        value: '1-0',
      },
      {
        label: '机房2-1',
        value: '1-1',
        children: [
          {
            label: '机柜2-1-1',
            value: '1-1-0',
          },
          {
            label: '机柜2-1-2',
            value: '1-1-1',
          },
          {
            label: '机柜2-1-3',
            value: '1-1-3',
          },
          {
            label: '机柜1-1-4',
            value: '1-1-4',
          },
        ],
      },
      {
        label: '机房2-1',
        value: '1-2',
      },
    ],
  },
];
// 模拟盲板统计分析页面-已选范围数据
function onSelectedRange(total) {
  const arr: any = [];
  for (let i: any = 0; i < total; i++) {
    arr.push('c2-301-11a' + i);
  }
  return arr;
}

// 模拟盲板统计分析页面-查询列表表格头
const queryHeader = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
  },
  {
    title: '区域',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: '机楼',
    dataIndex: 'build',
    key: 'build',
  },
  {
    title: '机房',
    dataIndex: 'machineRoom',
    key: 'machineRoom',
  },
  {
    title: '机柜',
    dataIndex: 'cabinet',
    key: 'cabinet',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '详情',
    dataIndex: 'details',
    key: 'details',
  },
];
// 模拟盲板统计分析页面-查询列表数据
function onQueryList(total) {
  const arr: any = [];
  for (let i: any = 0; i < total; i++) {
    arr.push({
      key: i,
      area: '区域',
      build: '机楼',
      machineRoom: '机房',
      cabinet: '机柜',
      time: '时间',
    });
  }
  return arr;
}
// 模拟盲板智慧监测页面-人工导入中的地点树数据
const manualTreeData = [
  {
    label: '机楼1',
    value: '0',
    children: [
      {
        label: '机房1-1',
        value: '0-0',
        cabinetChildren: [
          {
            label: '机柜1-1-1',
            value: '0-0-0',
          },
          {
            label: '机柜1-1-2',
            value: '0-0-1',
          },
          {
            label: '机柜1-1-3',
            value: '0-0-3',
          },
          {
            label: '机柜1-1-4',
            value: '0-0-4',
          },
        ],
      },
      {
        label: '机房1-2',
        value: '0-1',
      },
    ],
  },
  {
    label: '机楼2',
    value: '1',
    children: [
      {
        label: '机房2-1',
        value: '1-0',
      },
      {
        label: '机房2-2',
        value: '1-1',
        cabinetChildren: [
          {
            label: '机柜2-1-1',
            value: '1-1-0',
          },
          {
            label: '机柜2-1-2',
            value: '1-1-1',
          },
          {
            label: '机柜2-1-3',
            value: '1-1-3',
          },
          {
            label: '机柜1-1-4',
            value: '1-1-4',
          },
        ],
      },
      {
        label: '机房2-3',
        value: '1-2',
      },
    ],
  },
];
// 模拟盲板智慧监测页面-选择置信度的列表
const confidenceList = [
  {
    value: 'one',
    label: '置信度1',
  },
  {
    value: 'two',
    label: '置信度2',
  },
  {
    value: 'three',
    label: '置信度3',
  },
];
// 模拟盲板智慧监测页面-选择置信度的列表
const IOUList = [
  {
    value: 'one',
    label: 'IOU1',
  },
  {
    value: 'two',
    label: 'IOU2',
  },
  {
    value: 'three',
    label: 'IOU3',
  },
];
// 模拟盲板智慧监测页面-导入识别表格头
const distinguishHeader = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
  },
  {
    title: '区域',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: '机楼',
    dataIndex: 'build',
    key: 'build',
  },
  {
    title: '机房',
    dataIndex: 'machineRoom',
    key: 'machineRoom',
  },
  {
    title: '机柜',
    dataIndex: 'cabinet',
    key: 'cabinet',
  },
  {
    title: '图片',
    dataIndex: 'picture',
    key: 'picture',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];
// 模拟盲板统计分析页面-查询列表数据
function onDistinguishList(total, localImage) {
  const arr: any = [];
  for (let i: any = 0; i < total; i++) {
    arr.push({
      key: i,
      area: '区域',
      build: '机楼',
      machineRoom: '机房',
      cabinet: '机柜',
      picture: localImage,
    });
  }
  return arr;
}
export {
  levelList,
  alarmHeader,
  trendList,
  modelList,
  placeList,
  statisticsTreeData,
  queryHeader,
  manualTreeData,
  confidenceList,
  IOUList,
  distinguishHeader,
  simulateAlarmList,
  onSelectedRange,
  onQueryList,
  onDistinguishList,
};
