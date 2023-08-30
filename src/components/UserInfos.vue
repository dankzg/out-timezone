<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 12:04:13
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-30 09:08:21
-->
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import UserClock from './UserClock.vue'
import type { TimePickerInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { SearchSharp } from '@vicons/ionicons5'
import { userTimeZoneStore } from '@/stores/userDatas'
import { DateTime } from 'luxon'

const props = defineProps({
  showResult: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:showResult'])

//获取浏览器当前时区
const userStore = userTimeZoneStore()
const dt: DateTime = DateTime.local()

//存储浏览器当前基本信息
userStore.setUserData(dt)
const base = userStore.base

const zone = ref(base.timezone.toString())

const message = window.$message
const yWakeupTime = ref(null)
const hWakeupTime = ref(null)
const yTimePickerInstRef = ref<TimePickerInst | null>(null)
const hTimePickerInstRef = ref<TimePickerInst | null>(null)

//为了获得i18n数据，获取配置信息
const _this = getCurrentInstance()!.appContext.config.globalProperties

//按钮点击后操作
const searchTimezone = () => {
  if (yWakeupTime.value === null || yWakeupTime.value === '') {
    //message.error(_this.$t('error.your_input'))
    message.error(_this.$t('error.your_input'))
    yTimePickerInstRef.value?.focus()
    return
  }
  if (hWakeupTime.value === null || hWakeupTime.value === '') {
    message.error(_this.$t('error.his_input'))
    hTimePickerInstRef.value?.focus()
    return
  }
  calcTimezone()
}

const calcTimezone = () => {
  const userStore = userTimeZoneStore()
  const base = userStore.base
  const wakeup = userStore.wakeupTimes

  wakeup.your = yWakeupTime.value !== null ? yWakeupTime.value : ''
  wakeup.his = hWakeupTime.value !== null ? hWakeupTime.value : ''

  const zone = base.timezone.toString()
  //console.log(yWakeupTime)

  const y = DateTime.fromFormat(wakeup.your.toString(), 'HH:mm:ss', { zone: zone })
  const h = DateTime.fromFormat(wakeup.his.toString(), 'HH:mm:ss', { zone: zone })
  if (!y.isValid || !h.isValid) {
    message.error(_this.$t('error.input_format'))
    return
  }

  let offset = 0
  const offsetMinutes = y.diff(h, 'minutes').toObject().minutes
  if (offsetMinutes !== undefined) {
    offset = offsetMinutes
  }
  //console.log(offset)

  const hoursDown = Math.floor(offset / 60)
  const hoursUp = Math.ceil(offset / 60)

  //console.log(hoursDown)
  //console.log(hoursUp)

  userStore.calcHisTimezones(hoursDown, hoursUp)

  emit('update:showResult', true)
}
</script>
<template>
  <div class="userinfo">
    <div class="left-userinfo">
      <UserClock :timezone="zone" />
    </div>
    <div class="right-wakeuptime">
      <n-form label-placement="top">
        <n-grid :cols="1" :x-gap="1">
          <n-form-item-gi :label="_this.$t('home.your_timeinput')" path="inputValue">
            <n-time-picker
              v-model:formatted-value="yWakeupTime"
              ref="yTimePickerInstRef"
              format="HH:mm"
              value-format="HH:mm:ss"
              :minutes="[0, 10, 20, 30, 40, 50]"
              :placeholder="_this.$t('home.wakeup_time')"
              style="width: 100%"
              input-readonly
            />
          </n-form-item-gi>
          <n-form-item-gi :label="_this.$t('home.his_timeinput')" path="inputValue">
            <n-time-picker
              v-model:formatted-value="hWakeupTime"
              ref="hTimePickerInstRef"
              format="HH:mm"
              value-format="HH:mm:ss"
              :minutes="[0, 10, 20, 30, 40, 50]"
              :placeholder="_this.$t('home.wakeup_time')"
              style="width: 100%"
              input-readonly
            />
          </n-form-item-gi>
          <n-gi>
            <n-button type="primary" @click="searchTimezone" style="width: 100%">
              <template #icon>
                <n-icon>
                  <search-sharp />
                </n-icon>
              </template>
              {{ _this.$t('home.search_button') }}
            </n-button>
          </n-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<style scoped>
.userinfo {
  width: 800px;
  display: flex;
  border-radius: 12px;
  height: 300px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

@media screen and (max-width: 500px) {
  .userinfo {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: auto;
  }
}

.left-userinfo {
  position: relative;
  width: 600px;
  z-index: 0;
}

@media screen and (max-width: 500px) {
  .left-userinfo {
    width: 100%;
  }
}
.right-wakeuptime {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 1em;
  justify-content: center;
}

@media screen and (max-width: 500px) {
  .right-wakeuptime {
    width: 100%;
  }
}
</style>
