<script setup lang="ts">
import { ref } from 'vue'
import { DateTime } from 'luxon'
import { userTimeZoneStore } from '@/stores/userDatas'
import { LocationOutline } from '@vicons/ionicons5'
import Clock from '@/components/Clock.vue'

const props = defineProps({
  timezone: {
    type: String,
    default: ''
  }
})

const imageurl = ref('')
imageurl.value = '/images/shanghai-large.jpg'

const date = DateTime.now().setZone(props.timezone)
const formatDate = date.toFormat('yyyy-MM-dd')
const weekday = date.weekdayLong

const userStore = userTimeZoneStore()
const base = userStore.base
const userTimezone = ref('')
userTimezone.value = base.timezone.toString()
</script>
<template>
  <img :src="imageurl" alt="新图片" class="image" />
  <!--<n-image class="image" :src="imageurl" object-fit="fill" preview-disabled />-->
  <div class="overlay">
    <div class="date">
      <div class="top-left">
        {{ formatDate }}
        {{ weekday }}
      </div>
      <div class="top-right">
        <n-icon size="20" :component="LocationOutline" />
        UTC{{ base.offsetStr }}
      </div>
    </div>
    <div class="time">
      <Clock :timezone="userTimezone" />
    </div>
    <div class="local">
      <span class="city">{{ base.timezone }}</span>
      <span class="country">{{ base.country }}</span>
    </div>
  </div>
</template>

<style scoped>
.image {
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.date {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 1em;
  font-weight: bolder;
  display: flex;
}

.date .top-left {
  padding-left: 20px;
  align-content: center;
  width: 50%;
}

.date .top-right {
  display: flex;
  padding-right: 20px;
  align-content: center;
}

.time {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55%;
  font-size: 60px;
  padding-bottom: 10px;
}

.local {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  font-weight: bolder;
}

.city {
  font-size: 35px;
  width: 100%;
  text-align: center;
}
.country {
  font-size: 18px;
  width: 100%;
  text-align: center;
}
</style>
