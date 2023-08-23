<!--
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 19:39:37
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-21 19:59:21
-->
<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup() {
    window.$message = useMessage() // 关键代码
  }
})
</script>
<template></template>
