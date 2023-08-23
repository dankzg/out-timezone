/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-20 08:20:10
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-22 08:35:38
 */
import {DateTime} from 'luxon'
import { defineStore } from 'pinia'
import { useJsonTimezoneToCountryStore } from '@/stores/jsonTimezoneToCountry'
import { useJsonTimezoneStore } from '@/stores/jsonTimezone'



interface TimezoneInfo{
  name: String,
  utcOffset: Number,
  nowTime: String,
  country: String,
}

interface TimezoneInfos{
  [key: string]: TimezoneInfo[]
}


export const timezoneStore = defineStore("utcTimezone", {
  state:()=>({
    timezoneInfos: {} as Record<string,TimezoneInfo[]> 
  }),
  actions: {
    initData(){      
      const tsToCt = useJsonTimezoneToCountryStore()
      const ts = useJsonTimezoneStore()
      
      const ary = ts.nameList
      //const ary = Intl.supportedValuesOf('timeZone');


      const utcTime = DateTime.fromFormat('00:00:00', 'HH:mm:ss', {zone: 'utc'});
      //console.log(ary); 
      ary.forEach((item) => {
        const zone = item.toString()
        const now = DateTime.fromFormat('00:00:00', 'HH:mm:ss').setZone(zone)
        const utcOffset = now.offset / 60

        const otherTime = utcTime.setZone(zone)
        const otherStr = otherTime.toFormat('HHmm')

        let country = ""
        if(zone in tsToCt.countryList){
          country = tsToCt.countryList[zone]   
        }

        const tzInfo : TimezoneInfo = {
          name: item,
          utcOffset: utcOffset,
          nowTime: otherTime.toFormat('yyyy-MM-dd HH:mm:ss'),
          country: country,
        }
        //console.log(item, utcOffset,otherTime.toFormat('yyyy-MM-dd HH:mm:ss'),otherStr)
        if(!(otherStr in this.timezoneInfos)){
          this.timezoneInfos[otherStr] = []
        }
        this.timezoneInfos[otherStr].push(tzInfo)
      })
    },
  },
})