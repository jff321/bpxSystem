import axios from 'axios'

// 权限列表
export async function  rules (){
  const result = axios.get('manage/rules');
  return result ? result : false
}