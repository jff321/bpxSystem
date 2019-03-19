import axios from 'axios'

export async function  agents (){
  const result = axios.get('manage/agents');
  return result
}

// 搜索代理列表
export async function  search (keys, page, limit){
  const result = axios.get('manage/agents?keys='+keys+'&page='+page+'&limit='+limit);
  return result ? result : false
}