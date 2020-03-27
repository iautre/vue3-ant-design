import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listData: [],
    loading: true,
    postData: '',
    pageData: '',
    comments: [],
    userInfo: null,
    submitting: false,
    commentLoading: true,
    webTitle: ''
  },
  mutations: {
    getListData (state, param){
      var that = this
      var params = {
        type: "posts",
        pageSize: param.pageSize || 5,
        pageIndex: param.page || 1
      }
      api.getData(params).then(function(res){
        state.listData =  res.posts
        state.loading = false
        that.dispatch('setTitle', '')
      })
    },
    getPostData (state, param){
      var that = this
      var params = {
        type: "post",
        postId: param || 0,
      }
      api.getData(params).then(function(res){
        state.postData =  res.post
        state.loading = false
        that.dispatch('setTitle', res.post.title)
      })
    },
    getPageData (state, param){
      var that = this 
      var params = {
        type: "single",
        pageId: param || 0,
      }
      api.getData(params).then(function(res){
        state.pageData =  res.single
        state.loading = false
        that.dispatch('setTitle', res.single.title)
      })
    },
    getComments (state, param){
      var params = {
        type: "getComments",
        pageIndex: param.pageIndex || 1,
        pageSize: param.pageSize || 20,
        postId: param.postId,
        pageId: param.pageId,
        userId: state.userInfo !=null?state.userInfo.userId:null,
        authCode: state.userInfo !=null?state.userInfo.authCode:null
      }
      api.getData(params).then(function(res){
        state.comments =  res.comments
        state.commentLoading = false
      })
    },
    submitComment (state, param){
      var that = this
      if(!state.userInfo){
        alert("请先登录")
      }
      var params = {
        type: "insertComments",
        postId: param.postId || 1,
        coid: 0,
        ip: '127.0.0.1',
        text: param.text,
        userId: state.userInfo.userId,
        authCode: state.userInfo.authCode
      }
      api.getData(params).then(function(res){
        if(res.result.res=='loginbad'){
          localStorage.removeItem('autre_user_info');
          state.userInfo = null
          alert('登陆失效，请重新登陆')
        }else if(res.result.res=='ok'){
          that.dispatch('getComments',param)
        }
        state.submitting = false
      })
    },
    getuserInfo (state, param){
      if(param == "storage"){
        state.userInfo = JSON.parse(localStorage.getItem('autre_user_info'))
      }else{
        var params = {
          type: "weibo",
          code: param
        }
        api.login(params).then(function(res){
          if(res.result != 'no'){
            state.userInfo = res.result
            localStorage.setItem('autre_user_info', JSON.stringify(res.result))
          }
        })
      }
    },
    setLoading(state, param){
      state.loading = param == true ? true : false
    },
    setCommentLoading(state, param){
      state.commentLoading = param == true ? true : false
    },
    setsubmitting(state, param){
      state.submitting = param == true ? true : false
    },
    setTitle(state, param){
      state.webTitle = param ? param : ''
    }
  },
  actions: {
    getListData (context, param){
      context.commit('getListData',param)
    },
    getPostData (context, param){
      context.commit('getPostData',param)
    },
    getPageData (context, param){
      context.commit('getPageData',param)
    },
    getComments (context, param){
      context.commit('getComments',param)
    },
    submitComment (context, param){
      context.commit('submitComment',param)
    },
    getuserInfo(context, param){
      context.commit('getuserInfo',param)
    },
    setLoading(context, param){
      context.commit('setLoading',param)
    },
    setCommentLoading(context, param){
      context.commit('setCommentLoading',param)
    },
    setsubmitting(context, param){
      context.commit('setsubmitting',param)
    },
    setTitle(context, param){
      context.commit('setTitle', param)
    }
  }
})
