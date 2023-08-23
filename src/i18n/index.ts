/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 07:41:17
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-19 07:41:37
 */
import { createI18n } from 'vue-i18n'
import EN from './en'
import CN from './cn'

const message = {
  zh: {
    ...CN,
  },
  en: {
    ...EN,
  },
}

const i18n = createI18n({
  locale: localStorage.getItem('local') || navigator.language.slice(0, 2), // 设置语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: message,
})

export default i18n