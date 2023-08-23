<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-20 12:18:56
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-21 14:16:36
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { DateTime } from 'luxon'

//const timezone = 'America/New_York'
const props = defineProps({
  timezone: {
    type: String,
    default: ''
  }
})

const hours = ref('')
const minutes = ref('')
const seconds = ref('')
let timer: any

onMounted(() => {
  const updateTime = () => {
    const date = DateTime.now().setZone(props.timezone)
    //date.setZone(`'UTC${props.offset}'`)
    //console.log(props.timezone)
    if (props.timezone === 'Australia/Casey') {
      console.log(date)
    }
    hours.value = date.toFormat('HH')
    minutes.value = date.toFormat('mm')
    seconds.value = date.toFormat('ss')
  }
  //getCurrentTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
<template>
  <div class="clock">
    <span class="hour">{{ hours }}</span>
    :
    <span class="minute">{{ minutes }}</span>
    :
    <span class="second">{{ seconds }}</span>
  </div>
</template>

<style scoped>
.clock {
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  font-variant-numeric: tabular-nums;
}
.clock span {
  border-radius: 5px;
  padding: 1px 3px 3px 2px;
  color: #fff;
  margin: 0 1px;
  background: #222;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#555), to(#000));
  background: -webkit-linear-gradient(top, #555, #000);
  background: -moz-linear-gradient(top, #555, #000);
  background: -ms-linear-gradient(top, #555, #000);
  background: -o-linear-gradient(top, #555, #000);
}

.clock span:nth-child(3) {
  color: #333;
  background: #ddd;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#eee), to(#ccc));
  background: -webkit-linear-gradient(top, #eee, #ccc);
  background: -moz-linear-gradient(top, #eee, #ccc);
  background: -ms-linear-gradient(top, #eee, #ccc);
  background: -o-linear-gradient(top, #eee, #ccc);
}
</style>
