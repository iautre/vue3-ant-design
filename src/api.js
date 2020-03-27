import axios from 'axios'
import Vue from 'vue'

export function fetch(url, params) {
  if(!url) return
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'POST',
      data: params, 
      headers: {
        'content-Type':'application/json'
      }
    }).then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export default {
  // 获取我的页面的后台数据
  getData(params) {
    return fetch('https://autre.cn/api/post',params);
  },
  login(params){
    return fetch('https://autre.cn/api/login',params);
  }
}