<script setup lang="ts">
import { ref } from 'vue'
import { DateTime } from 'luxon'
import { Flag, LocationOutline, CalendarOutline, TimeOutline } from '@vicons/ionicons5'
const props = defineProps({
  utc: Object,
  imageurl: String
})

const showContent = ref(true)
const imageUrl = ref('')

const name = props.utc?.name
const country = props.utc?.country
const utcOffset = props.utc?.utcOffset

const now = DateTime.now().setZone(name)
let date = now.toFormat('yyyy-MM-dd')
let time = now.toFormat('HH:mm:ss')
const weekday = now.weekdayLong

const offset = ((num: number) => {
  if (num >= 0) {
    return '+' + num.toString()
  } else {
    return num.toString()
  }
})(utcOffset)

const isHover = ref(false)
const showMoreInfo = () => {
  const now = DateTime.now().setZone(name)

  date = now.toFormat('yyyy-MM-dd')
  time = now.toFormat('HH:mm:ss')
  isHover.value = true
  showContent.value = false
}

const showModal = ref(false)

//imageurl.value = `../plublic/images/` + props.imageurl
const imageName = name.replace(/\//g, '_').toLowerCase()
imageUrl.value = `/images/${imageName}.jpg`
const baseImgUrl = ref("this.src='/base_clock.jpg'")
//imageurl.value = '../public/images/shanghai-clock.jpg'
</script>
<template>
  <div
    class="timezone-card"
    @mouseenter="showMoreInfo"
    @mouseleave="showContent = true"
    :style="{ cursor: isHover ? 'zoom-in' : 'default' }"
    @click="showModal = true"
  >
    <img :src="imageUrl" alt="新图片" class="image" :onerror="baseImgUrl" />
    <div class="overlay" v-if="showContent">
      <div class="date">
        <span>
          {{ date }}
          {{ weekday }}
        </span>
        <span>UTC{{ offset }}</span>
      </div>
      <div class="local">
        <span class="city">{{ name }}</span>
        <span class="country">{{ country }}</span>
      </div>
    </div>
    <div class="overlay action" v-else>
      <ul class="moreinfo">
        <li>
          <span>
            <n-icon> <Flag color="#67C23A" /> </n-icon>
          </span>
          {{ country }}
        </li>
        <li>
          <span>
            <n-icon> <LocationOutline color="#E6A23C" /> </n-icon>
          </span>
          UTC{{ offset }}
        </li>
        <li>
          <span>
            <n-icon> <CalendarOutline color="#F56C6C" /> </n-icon>
          </span>
          {{ date }}
        </li>
        <li>
          <span>
            <n-icon> <TimeOutline color="#409EFF" /> </n-icon>
          </span>
          {{ time }}
        </li>
      </ul>
    </div>
  </div>
  <n-modal v-model:show="showModal">
    <n-card style="width: 1000px" :bordered="true" size="huge" role="dialog" aria-modal="true">
      <TimezoneDetail :timezone="name" :country="country" :offset="props.utc?.utcOffset" />
    </n-card>
  </n-modal>
</template>

<style scoped>
.timezone-card {
  position: relative;
  width: 230px;
  height: 200px;
  margin: 1em;
}

.image {
  width: 100%;
  height: 100%;
  border-radius: 15px;
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
  align-content: flex-start;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.action {
  background-color: rgba(0, 0, 0, 0.5);
}
.date {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40%;
  margin-left: 1em;
  font-weight: bolder;
}
.local {
  display: flex;
  height: 50%;
  align-content: flex-start;
  flex-wrap: wrap;
  font-weight: bolder;
}
.city {
  font-size: 23px;
  width: 100%;
  text-align: center;
  word-break: break-all;
  white-space: pre-wrap;
}
.country {
  font-size: 18px;
  width: 100%;
  text-align: center;
}
.time {
  font-size: 28px;
}
ul {
  padding-inline-start: 10px;
}
.moreinfo ul,
.moreinfo li {
  list-style-type: none;
}
.moreinfo li {
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 20px;
}
.moreinfo li span {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 20px;
  padding-right: 10px;
  font-weight: bolder;
}
.moreinfo li .el-icon {
  font-size: 20px;
  padding-right: 5px;
  font-weight: bolder;
}
</style>
