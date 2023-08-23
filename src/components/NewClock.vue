<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-22 16:06:19
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-22 16:33:31
-->
<template>
  <div class="flip-clock">
    <div class="flip-card" v-for="(digit, index) in digits" :key="index">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <span>{{ digit }}</span>
        </div>
        <div class="flip-card-back">
          <span>{{ getNextDigit(digit) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'FlipClock',
  setup() {
    const digits = ref(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    const currentIndex = ref(0)

    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % digits.value.length
    }, 1000)

    const getNextDigit = (currentDigit: string) => {
      const currentIndexValue = digits.value.indexOf(currentDigit)
      const nextIndex = (currentIndexValue + 1) % digits.value.length
      return digits.value[nextIndex]
    }

    return {
      digits,
      getNextDigit
    }
  }
})
</script>

<style scoped>
.flip-clock {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card {
  perspective: 1000px;
  margin: 0 4px;
}

.flip-card-inner {
  position: relative;
  width: 36px;
  height: 50px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-back {
  background-color: #f4f4f4;
  transform: rotateX(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card span {
  font-size: 24px;
}
</style>
