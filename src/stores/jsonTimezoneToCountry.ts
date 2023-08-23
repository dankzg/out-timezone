/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-20 08:14:23
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-21 14:30:23
 */
import {defineStore} from "pinia";
import jsonTimezoneToCountries from '@/data/timezone-to-countries.json';

interface timezoneToCountryList {
  [key : string]: string
}



export const useJsonTimezoneToCountryStore = defineStore("timezoneToCountry", {
  state: ()=>({
    //countryList: {} as jsonTimezoneToCountries,
    countryList: {} as timezoneToCountryList,
  }),
  actions:{
    initData(){
      this.countryList = jsonTimezoneToCountries as timezoneToCountryList
    },

  }

})