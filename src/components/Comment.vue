<template>
  <div>
    <a-list
      v-if="comments.length"
      :dataSource="comments"
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
      itemLayout="horizontal"
      :loading="commentLoading"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
          <a-comment
          :author="item.author"
          :avatar="item.avatar"
        >
          <p slot="content"><em class="parent-author" v-if="item.parent!='0'">@{{item.parentInfo.author}}</em> {{item.text}}</p>
          <a-tooltip slot="datetime" :title="common.formatDate(item.created)">
            <span>{{common.formatDate(item.created)}}</span>
            <span> {{common.commentstatus(item.status)}}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-comment>
      <a-avatar
        slot="avatar"
        :src="userInfoavatar"
        :alt="userInfoname"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" @change="handleChange" :value="value" ></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit"
            type="primary"
          >
            评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      value: '',
      moment,
    }
  },
  computed:{
    comments(){
      return this.$store.state.comments
    },
    submitting(){
      return this.$store.state.submitting
    },
    userInfoavatar(){
      return this.$store.state.userInfo!=null?this.$store.state.userInfo.avatar:''
    },
    userInfoname(){
      return this.$store.state.userInfo!=null?this.$store.state.userInfo.name:''
    },
    commentLoading(){
      return this.$store.state.commentLoading
    }
  },
  methods: {
    handleSubmit() {
      if(!this.$store.state.userInfo){
        this.common.login(this)
        return
      }
      if (!this.value) {
        return
      }
      this.$store.dispatch('setsubmitting',true)
      var param = {
        text: this.value,
        postId: this.$route.params.post_id,
        comment: {
          author: this.userInfoname,
          avatar: this.userInfoavatar,
          content: this.value,
          datetime: moment().fromNow(),
        }
      }
      this.$store.dispatch('setCommentLoading',true)
      this.$store.dispatch('submitComment',param)
      this.value = ''
    },
    handleChange(e) {
      this.value = e.target.value
    },
    getData:function(){
      var param ={
        pageIndex: 1,
        pageSize: 20,
         postId: this.$route.params.post_id
      }
      this.$store.dispatch('setCommentLoading',true)
      this.$store.dispatch('getComments',param)
    }
  },
  mounted:function(){
    this.getData()
  },
  watch:{
    '$route': 'getData'
  }
}
</script>