<template>
  <div class="pag-box">
    <div class="previous-page" v-if="flag" @click="onPreviousPage(current, total)">上一页</div>
    <div class="current-page">
      <div class="current-page-left">{{ current }}</div>
      <div class="current-page-center">/</div>
      <div class="current-page-right">{{ total }}</div>
    </div>
    <div class="next-page" v-if="flag" @click="onNextPage(current, total)">下一页</div>
  </div>
</template>

<script setup lang="ts">
  // import { throttle } from '../utils/tool.ts';
  import { defineProps, defineEmits } from 'vue';

  const emit = defineEmits(['previousPage']);
  defineProps({
    current: { type: Number, default: 2 },
    total: { type: Number, default: 5 },
    flag: { type: Boolean, default: true },
  });
  const onPreviousPage = function (current: any, total: Number) {
    let Str: Number = 0;
    if (current === 1) {
      Str = total;
    } else {
      Str = current - 1;
    }
    emit('previousPage', { current: Str });
  };
  // throttle(onPreviousPage, 500);
  const onNextPage = function (current: any, total: Number) {
    let num = 0;
    if (current === total) {
      num = 1;
    } else {
      num = current + 1;
    }
    emit('previousPage', { current: num });
  };
  // throttle(onNextPage, 500);
</script>

<style scoped lang="less">
  .pag-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;

    .previous-page {
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

    .previous-page:active {
      background-color: #358eec; /* 鼠标按下时的背景色 */
      color: #fff;
    }

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

    .next-page:active {
      background-color: #358eec; /* 鼠标按下时的背景色 */
      color: #fff;
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
</style>
