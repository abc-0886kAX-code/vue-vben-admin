<!--
 * @FilePath: \vue-vben-admin\src\views\extra\layout\index.vue
 * @Author: zhangxin
 * @Date: 2024-07-17 15:27:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-07-17 18:07:06
 * @Description: 
-->
<script setup lang="ts">
  import type { PropType } from 'vue';
  import { defineProps, computed, ref, onMounted, unref } from 'vue';
  import { FileOutlined } from '@ant-design/icons-vue';
  import { SlideYTransition } from '/@/components/Transition/index';

  const props = defineProps({
    menus: {
      type: Array as PropType<[]>,
      default: () => [],
    },
    activeKeyWord: {
      type: String as PropType<string>,
      default: '',
    },
  });

  const isMenus = computed(() => {
    return props.menus.length > 0;
  });

  const defineActiveKeyWord = computed(() => {
    const checkKeyWord =
      props.activeKeyWord !== '' &&
      props.menus.find((item) => item.keyword === props.activeKeyWord);
    return checkKeyWord ? props.activeKeyWord : props.menus[0]?.keyword;
  });

  const active = ref<Object>({});

  const component = computed(() => {
    return unref(active).component;
  });

  function handleMenuClick(keyword: string) {
    if (keyword && keyword === unref(active).keyword) {
      return;
    }

    active.value = props.menus.find((item) => item.keyword === keyword);
  }

  onMounted(() => {
    handleMenuClick(unref(defineActiveKeyWord));
  });
</script>

<template>
  <div class="layout flex flex-justify-between" v-if="isMenus">
    <div class="layout-menu">
      <div
        class="layout-menu-item flex flex-justify-start flex-items-center"
        v-for="menu in menus"
        :key="menu.keyword"
        :class="{ active: menu.keyword === active.keyword }"
        @click="handleMenuClick(menu.keyword)"
      >
        <FileOutlined />
        <div class="layout-menu-item-title">{{ menu.title }}</div>
      </div>
    </div>
    <div class="layout-body">
      <SlideYTransition>
        <component :is="component" />
      </SlideYTransition>
    </div>
  </div>
  <div class="layout" v-else> 没有菜单 </div>
</template>

<style scoped lang="less">
  .layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #c7e6fb;
    &-menu {
      width: 15%;
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
      &-item {
        padding: 20px;
        box-sizing: border-box;
        font-size: 14px;
        cursor: pointer;
        height: 50px;
        width: 100%;
        &-title {
          margin-left: 10px;
        }
      }
    }
    &-body {
      width: 83%;
      height: 100%;
    }
  }
  .active {
    color: #2db8f0;
  }
</style>
