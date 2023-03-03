import { defineStore } from 'pinia'
import head from '../../common/head'
import api from '../../common/api'

interface IPage{
    title:string|null
    text:string|null
}
interface IPost{
    categories: any
    thumb: any
    tag: any
    created: string
    title: string
    text: string
}

// 参数1 唯一标识
// 参数2 配置对象
const usePostStore = defineStore('post', {
    // 状态
    state() {
        return {
            list: [],
            data: <IPost>{},
            page: <IPage>{},
            comments: [],
            loading: false,
            commentLoading: false,
            headImg: 'https://p1.static.autre.cn/uploads/me/2020/05/3223183942.jpeg'
        }
    },
    // 状态数据计算属性 相当于computed
    getters: {
        listData(): Array<any> {
            return this.list
        }
    },
    // 修改状态 同步异步都可修改
    actions: {
        getList(param: {page:number;pageSize?:number;} = { pageSize: 5, page: 1 }) {
            head.setTitle()
            this.loading = true
            let params = {
                type: "posts",
                pageSize: param.pageSize || 5,
                pageIndex: param.page || 1
            }
            api.getData(params).then((res: any) => {
                // res.posts
                this.list = res.posts
                this.loading = false
            })
        },
        getData(postId = 0) {
            this.loading = true
            const params = {
                type: "post",
                postId: postId,
            }
            api.getData(params).then((res:any) => {
                head.setTitle(res.post.title)
                this.data = res.post
                if (res.post.thumb.headImg){
                    this.headImg = res.post.thumb.headImg
                }else if (res.post.thumb.firstimg){
                    this.headImg = res.post.thumb.firstimg
                }
                this.loading = false
            })
        },
        getPage(pageId = "") {
            this.loading = true
            const params = {
                type: "single",
                pageId: pageId,
            }
            api.getData(params).then((res:any) => {
                head.setTitle(res.single.title)
                this.page = res.single
                this.loading = false
            })
        }
    }
})

// 导出
export default usePostStore
