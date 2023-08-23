/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-21 19:55:19
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-21 20:01:28
 */
import type { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider"
declare global {
  interface Window {
      $message: MessageApiInjection
  }
}