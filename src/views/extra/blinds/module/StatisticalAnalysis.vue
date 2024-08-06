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
      <div class="my-title">
        <myTitle :titleData="'查询条件'" :titleType="'rectangle'" />
        <div class="analysis-box-bottom"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import myTitle from '../../component/my_title.vue';
  import { detailOption, foldOption, getChart } from '../../echarts/detail_echarts';
  import { onMounted, onUnmounted } from 'vue';
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

  onMounted(() => {
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
      border-radius: 12px;
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
        width: 400px;
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
      box-sizing: border-box;
      width: 100%;
      height: calc(65% - 24px);
      margin-top: 24px;
      padding: 12px;
      border-radius: 12px;
      background: #fff;
    }
  }

  .my-title {
    width: 100%;
    height: 28px;
  }
</style>
