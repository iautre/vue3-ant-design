import { defineStore } from 'pinia'

import api from '../../common/api'

interface IUserInfo{
    name?: string;
    profile_url?: string;
    avatar?: string;
    userId?: number;
    authCode?: string;
}

// 参数1 唯一标识
// 参数2 配置对象
const useUserStore = defineStore('user', {
    // 状态
    state:()=> {
        return {
            userInfo:  <IUserInfo|null>null,
            loading: false,
        }
    },
    // 状态数据计算属性 相当于computed
    getters: {
        userId(): any {
            return null
        },
        authCode(): any {
            return null
        }
    },
    // 修改状态 同步异步都可修改
    actions: {
        getUserInfo(param: string | null) {
            if (param === "storage") {
                const info = localStorage.getItem('autre_user_info')
                if (info){
                    const copy = JSON.parse(info)
                    this.userInfo = copy
                }
            } else {
                const params = {
                    type: "weibo",
                    code: param
                }
                api.login(params).then((res: any) => {
                    if (res.result != 'no') {
                        this.userInfo = res.result
                        localStorage.setItem('autre_user_info', JSON.stringify(res.result))
                    }
                })
            }
        },

    }
})

// 导出
export default useUserStore
