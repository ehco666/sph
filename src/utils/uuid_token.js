import {v4 as uuidv4} from 'uuid'

export const getUUID = () => {
  // 从本地获取uuid(查看本地存储里面是否存在)
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  // 如果没有就生成uuid
  if(!uuid_token) {
    // 生成uuid
    uuid_token = uuidv4();
    // 在本地 存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  // 返回uuid
  return uuid_token;
}