import axios from 'axios'

// 代理列表, 搜索代理列表
export async function  agents (keys, page, limit){
  const result = axios.get('manage/agents?keys='+keys+'&page='+page+'&limit='+limit);
  return result ? result : false
}

// 启用，禁用代理商
export async function change(data) {
  const result = axios.post('manage/agents/enables', data);
  return result ? result : false
}