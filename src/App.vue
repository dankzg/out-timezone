<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 07:23:25
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-21 19:56:39
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LanguageSharp } from '@vicons/ionicons5'
import { ref, h, watch } from 'vue'
import type { Component } from 'vue'
import { darkTheme, NIcon, dateZhCN, zhCN } from 'naive-ui'
import type { NLocale, NDateLocale } from 'naive-ui'
import type { MenuOption, NMessageProvider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import usemessageComponents from './components/usemessageComponents.vue'

//初始化获取i8n以及默认设置
const { locale } = useI18n()
locale.value = localStorage.getItem('language') || 'zh'

//const placeholder = $t('home.your_timezone')
//设置naive-ui主题和语言
const theme = darkTheme
const msgLocale = ref<NLocale | null>(null)
const dateLocale = ref<NDateLocale | null>(null)

//根据菜单设置控制所用语言
const activeKey = ref<string | null>(null)
watch(activeKey, () => {
  if (activeKey.value === 'en') {
    msgLocale.value = null
    dateLocale.value = null
    locale.value = 'en'
  } else {
    msgLocale.value = zhCN
    dateLocale.value = dateZhCN
    locale.value = 'zh'
  }
  localStorage.setItem('language', locale.value)
})

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions: MenuOption[] = [
  {
    label: '',
    key: 'dance-dance-dance',
    icon: renderIcon(LanguageSharp),
    children: [
      {
        label: '中文',
        key: 'cn'
      },
      {
        label: 'English',
        key: 'en'
      }
    ]
  }
]
</script>

<template>
  <n-config-provider :theme="theme" :locale="msgLocale" :date-locale="dateLocale">
    <n-global-style />
    <n-layout>
      <n-layout-header class="navbar">
        <div class="navbar-wrapper">
          <div class="logo">
            <img src="../public/weblogo2.png" width="30" />
          </div>
          <div class="menu-items">
            <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
          </div>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;" class="content">
        <main class="maindata">
          <RouterView />
        </main>
      </n-layout-content>
    </n-layout>
    <n-message-provider>
      <usemessageComponents />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.navbar {
  /*position: relative;*/
  border-bottom: 1px solid var(--border-color);
  height: calc(var(--header-height) - 1px);
  padding: 0 12px 0 24px;
  background-image: radial-gradient(transparent 1px, var(--n-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  top: 0;
  display: flex;
  justify-content: center;
}

.navbar-wrapper {
  display: flex;
  align-items: center;
  max-width: 800px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.n-icon {
  color: #ffe1b6;
}
.logo {
  display: flex;
  margin-right: auto;
  align-items: center;
}

.menu-items {
  margin-left: auto;
  display: flex;
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.maindata {
  max-width: 800px;
}
</style>
