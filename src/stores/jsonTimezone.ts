/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-22 07:59:17
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-22 08:21:44
 */
import {defineStore} from "pinia";
import jsonTimezone from '@/data/timezonezip.json';

interface JsonTimezone {
  value: string
  abbr: string
  offset: number
  isdst: boolean
  text: string
  utc: string[]
}



export const useJsonTimezoneStore = defineStore("timezones", {
  state: ()=>({
    detailList: [] as JsonTimezone[],
    nameList:[] as String[]
  }),
  actions:{
    initData(){
      this.detailList = jsonTimezone as JsonTimezone[]
      this.detailList.forEach((timezone)=>{
        this.nameList.push(...timezone.utc)
      })
    },
  }

})