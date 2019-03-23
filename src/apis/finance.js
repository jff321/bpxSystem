import axios from 'axios'

// 财务明细列表
export async function  finance (keys, types, start_date, end_date, page, limit){
  const result = axios.get('manage/finance/lists?keys='+keys+'&types='+types+'&start_date='+start_date+'&end_date='+end_date+'&page='+page+'&limit='+limit);
  return result ? result : false
}

// 财务统计列表
export async function  counts (keys, types, start_date, end_date, page, limit){
  const result = axios.get('manage/finance/counts?keys='+keys+'&types='+types+'&start_date='+start_date+'&end_date='+end_date+'&page='+page+'&limit='+limit);
  return result ? result : false
}