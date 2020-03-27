<template>
  <div class="post_content">
    <h2 style="margin: '16px 0'">{{postData.title}}</h2>
     <div class="icons-list">
        <a-icon type="edit" />{{common.formatDate(postData.created)}} 
        <template v-if="postData.thumb && postData.thumb.gps" ><a-icon type="environment" />{{ postData.thumb.gps }} </template>
        <a-icon type="bars" /><template v-for="item in postData.categories" >{{item.name}}  </template>
      </div>
     <div class="content-text" v-html="common.markdown(postData.text,postData.isMarkdown)"/>
     <div v-if="postData.tag && postData.tag.length > 1">
        <a-icon type="tag" /> : 
        <a-tag v-for="item in postData.tag" v-bind:key="item.name">{{item.name}}</a-tag>
    </div>
    <a-divider />
    <Comment />
  </div>
</template>
<script>
import Comment from '@/components/Comment.vue'
export default {
  data () {
    return {
      
    }
  },
  components: {
    Comment
  },
  computed:{
    postData(){
      return this.$store.state.postData
    },
    loading(){
      return this.$store.state.loading
    }
  },
  methods:{
    getData:function(){
      this.$store.dispatch('setLoading',true)
      this.$store.dispatch('getPostData',this.$route.params.post_id)
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

<style lang="less">
.content-text{
  margin-top: 10px;
}
.icons-list{
  margin-left:-8px;
}
.icons-list .anticon {
  margin-left: 8px;
  margin-right: 6px;
}
</style>
