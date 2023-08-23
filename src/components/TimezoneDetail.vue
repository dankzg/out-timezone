<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-20 15:44:34
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-22 16:37:07
-->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  name: String,
  country: String,
  offset: Number
})

const imgUrl = ref('')
imgUrl.value = 'https://nationsgeo.com/images/timezone/utc' + props.offset + '.jpg'
//console.log(imgUrl)
</script>
<template>
  <div class="timezone-map">
    <img :src="imgUrl" width="800" alt="" />
  </div>
</template>

<style scoped>
.timezone-map {
  display: flex;
  justify-content: center;
}
</style>
