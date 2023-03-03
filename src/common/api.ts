import axios from 'axios'

export function fetch(url:string, params:any):Promise<any> {
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
  getData(params:any):Promise<any> {
    return fetch('https://autre.cn/api/post',params);
  },
  login(params:any):Promise<any>{
    return fetch('https://autre.cn/api/login',params);
  }
}