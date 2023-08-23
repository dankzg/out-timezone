<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-20 12:48:24
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-21 14:15:11
-->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { userTimeZoneStore } from '@/stores/userDatas'
import TimezoneCard from './TimezoneCard.vue'

const userStore = userTimeZoneStore()

let hisTimezones = ref<any[]>([])
hisTimezones.value = userStore.calcTimezones
watch(
  () => userStore.calcTimezones,
  () => {
    hisTimezones.value = userStore.calcTimezones
  }
)
</script>

<template>
  <div>
    <div class="timezones">
      <TimezoneCard v-for="utc in hisTimezones" :key="utc" :utc="utc" />
    </div>
  </div>
</template>

<style scoped>
.item-title {
  font-size: 20px;
}
.timezones {
  display: flex;
  justify-content: space-start;
  flex-wrap: wrap;
}
</style>
