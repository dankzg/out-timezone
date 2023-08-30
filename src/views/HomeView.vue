<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 07:23:25
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-30 09:24:32
-->
<script setup lang="ts">
import UserInfos from '../components/UserInfos.vue'
import ResultList from '../components/ResultList.vue'
import { ref, watch, nextTick } from 'vue'
import { timezoneStore } from '@/stores/timezoneDatas'
import { useJsonTimezoneToCountryStore } from '@/stores/jsonTimezoneToCountry'
import { useJsonTimezoneStore } from '@/stores/jsonTimezone'

const tzToCtStore = useJsonTimezoneToCountryStore()
tzToCtStore.initData()

const jsonTsStore = useJsonTimezoneStore()
jsonTsStore.initData()

const tsStore = timezoneStore()
tsStore.initData()

const showResult = ref(false)

watch(showResult, (value) => {
  if (value) {
    nextTick(() => {
      const targetDiv = document.getElementById('targetDiv')
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
})
</script>

<template>
  <UserInfos v-model:showResult="showResult" />
  <div v-if="showResult" ref="targetDiv">
    <n-divider dashed>{{ $t('home.result_title') }}</n-divider>
    <ResultList />
  </div>
</template>
