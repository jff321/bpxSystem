import axios from 'axios'

// 财务明细列表(用户)
export async function  finance (id, keys, types, start_date, end_date, page, limit){
  const result = axios.get(`manage/finance/lists?id=${id}&keys=${keys}&types=${types}&start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}`);
  return result ? result : false
}

// 财务统计列表(代理)
export async function  counts (id, keys, types, start_date, end_date, page, limit){
  const result = axios.get(`manage/finance/counts?id=${id}&keys=${keys}&types=${types}&start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}`);
  return result ? result : false
}

// 导出代理财务明细
export async function  agentsFinance (id, keys, types, start_date, end_date){
  const result = axios.get(`manage/finance/agent_fund?id=${id}&keys=${keys}&types=${types}&start_date=${start_date}&end_date=${end_date}&page=all&limit=all`);
  return result ? result : false
}

// 导出用户财务明细
export async function  usersFinance (id, keys, types, start_date, end_date){
  const result = axios.get(`manage/finance/user_fund?id=${id}&keys=${keys}&types=${types}&start_date=${start_date}&end_date=${end_date}&page=all&limit=all`);
  return result ? result : false
}