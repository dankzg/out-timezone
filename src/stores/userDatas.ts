/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-20 08:18:23
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-22 16:36:19
 */
import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { timezoneStore} from  './timezoneDatas'
import { useJsonTimezoneToCountryStore } from '@/stores/jsonTimezoneToCountry'

interface UserTimeZone {
  base: {
    timezone: String,
    offset: Number,
    offsetStr: String,
    offsetMinutes:Number,
    country: String
  },
  wakeupTimes:{
    your: String | null,
    his: String | null,
  },
  calcTimezones:any[],
}



export const userTimeZoneStore = defineStore("userTimeZone", {
  state:(): UserTimeZone=>({
    base: {
      timezone: "",
      offset: 0,
      offsetStr: "",
      offsetMinutes: 0,
      country: ""
    },
    wakeupTimes:{
      your: "",
      his: ""
    },
    calcTimezones: [],
  }),
  actions:{
    setUserData(data: DateTime){
      const zoneName = data.zoneName !== null ? data.zoneName : ""
      const tzToct = useJsonTimezoneToCountryStore()
      let country = ""
      if(zoneName in tzToct.countryList){
        country = tzToct.countryList[zoneName]
      }
      this.base = {
        timezone: zoneName,
        offset: parseFloat(data.toFormat('Z')),
        offsetStr: data.toFormat('Z'),
        offsetMinutes: data.offset,
        country: country
      }
    },
    calcHisTimezones(hourDown: number, hourUp: number){
      const tsStore = timezoneStore()
      const tsDatas = tsStore.$state.timezoneInfos

      const utcTime = DateTime.fromFormat('00:00:00', 'HH:mm:ss', {zone: 'utc'});
      //console.log(utcTime)
      const localTime = utcTime.setZone(this.base.timezone.toString())
      //console.log(localTime)

      this.calcTimezones = []
      if(hourDown === hourUp){
        const newDateTime = localTime.plus({hours: hourDown})
        //console.log(newDateTime)
        const key = newDateTime.toFormat('HHmm').toString()
        //console.log(key)
        if(key in tsDatas){
          const tsInfos = tsDatas[key]
          //console.log(tsInfos)
          this.calcTimezones = [...this.calcTimezones,...tsInfos]
        }
      }else{
        //console.log(hourDown,hourUp)
        const minuteDown = hourDown*60
        const minutes = [minuteDown,minuteDown+30,minuteDown+45,minuteDown+60]
        minutes.forEach((item)=>{
          const newDateTime = localTime.plus({minutes: item})
          const key = newDateTime.toFormat('HHmm').toString()
          //console.log(key)
          if(key in tsDatas){
            const tsInfos = tsDatas[key]
            //console.log(tsInfos)
            this.calcTimezones = [...this.calcTimezones,...tsInfos]
          }
        })
      }
    }
  },
})