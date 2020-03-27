<template>
  <div class="header-menu">
    <a-menu
      mode="horizontal"
    >
      <a-menu-item key="home">
        <router-link to="/" >Autre.me</router-link>
      </a-menu-item>
      <a-menu-item key="about" >
        <router-link to="/about" >关于我</router-link>
      </a-menu-item>
      <a-menu-item key="biaoben" >
        <router-link to="/my-biaoben" >标本</router-link>
      </a-menu-item>
      <a-menu-item key="100flower" >
        <router-link to="/100flower" >百花</router-link>
      </a-menu-item>
      <a-menu-item key="login" >
        <a v-if="!userInfo" v-on:click="login" >登录</a>
        <a v-if="userInfo" :href="userInfo.profile_url" target="_blank">@{{userInfo.name}}</a>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    login: function () {
      this.common.login(this)
    }
  },
  mounted: function () {
    this.$store.dispatch('getuserInfo', 'storage')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header-menu{
  max-width: 800px;
  margin: 0 auto;
}
.ant-menu-horizontal{
  height: 60px;
  line-height: 60px;
}
</style>
