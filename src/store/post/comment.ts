import { defineStore } from 'pinia'
import useUserStore from '../user'

import api from '../../common/api'
import login from '../../common/login'

// 参数1 唯一标识
// 参数2 配置对象
const useCommentStore = defineStore('comment', {
    // 状态
    state() {
        return {
            comments: [],
            loading: false,
            submitting: false
        }
    },
    // 状态数据计算属性 相当于computed
    getters: {
    },
    // 修改状态 同步异步都可修改
    actions: {

        getComments(param: any) {
            const params = {
                type: "getComments",
                pageIndex: param.pageIndex || 1,
                pageSize: param.pageSize || 20,
                postId: param.postId,
                pageId: param.pageId,
                userId: useUserStore().userId,
                authCode: useUserStore().authCode
            }
            this.loading = true
            api.getData(params).then((res: any) => {
                this.comments = res.comments
                this.loading = false
            })
        },
        submitComment(param: any) {
            if (!useUserStore().userInfo) {
                login()
                return
            }
            const params = {
                type: "insertComments",
                postId: param.postId || 0,
                coid: param.coid || 0,
                ip: '127.0.0.1',
                text: param.text,
                userId: useUserStore().userId,
                authCode: useUserStore().authCode
            }
            this.submitting = true
            api.getData(params).then((res: any) => {
                if (res.result.res == 'loginbad') {
                    localStorage.removeItem('autre_user_info');
                    useUserStore().userInfo = null
                    alert('登陆失效，请重新登陆')
                } else if (res.result.res == 'ok') {
                    this.getComments(param)
                }
                this.submitting = false
            }).catch((err: any) => {
                this.submitting = false
            })
        },
    }
})

// 导出
export default useCommentStore
