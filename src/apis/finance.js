import axios from 'axios'

// 财务明细列表
export async function  finance (id, keys, types, start_date, end_date, page, limit){
  const result = axios.get(`manage/finance/lists?id=${id}&keys=${keys}&types=${types}&start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}`);
  return result ? result : false
}

// 财务统计列表
export async function  counts (id, keys, types, start_date, end_date, page, limit){
  const result = axios.get(`manage/finance/counts?id=${id}&keys=${keys}&types=${types}&start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}`);
  return result ? result : false
}