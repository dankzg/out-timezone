<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 07:23:25
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-22 16:34:33
-->
<script setup lang="ts">
import UserInfos from '../components/UserInfos.vue'
import ResultList from '../components/ResultList.vue'
import { ref } from 'vue'
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
</script>

<template>
  <UserInfos v-model:showResult="showResult" />
  <div v-if="showResult">
    <n-divider dashed>{{ $t('home.result_title') }}</n-divider>
    <ResultList />
  </div>
</template>
