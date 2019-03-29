import axios from 'axios'

// 匹配列表
export async function  mates (box_id, start_date, end_date, keys, page, limit){
  const result = await axios.get(`manage/mates?box_id=${box_id}&start_date=${start_date}&end_date=${end_date}&keys=${keys}&page=${page}&limit=${limit}`);
  return result ? result : false
}

// 查询盒子采集数据
export async function  todaymac (box_id, start_date, end_date){
  const result = await axios.get(`manage/mates/todaymac?box_id=${box_id}&start_date=${start_date}&end_date=${end_date}`);
  return result ? result : false
}

// 盒子数据
export async function  boxs (){
  const result = await axios.get(`manage/mates/getbox`);
  return result ? result : false
}

// 创建匹配
export async function  addMates (data){
  const result = await axios.post(`manage/mates`, data);
  return result ? result : false
}

// 创建匹配
export async function  getMayNums (box_id, range_id, min_time, max_time, start_date, end_date){
  const result = await axios.get(`manage/mates/matenum?box_id=${box_id}&range_id=${range_id}&min_time=${min_time}&max_time=${max_time}&start_time=${start_date}&end_date=${end_date}`);
  return result ? result : false
}

// 列表详情
export async function  details (id, keys, page, limit, start_date, end_date){
  const result = await axios.get(`manage/mates/getlist?id=${id}&keys=${keys}&page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`);
  return result ? result : false
}

