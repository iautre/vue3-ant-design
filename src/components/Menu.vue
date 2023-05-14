<template>
  <div class="header-menu">
    <a-menu mode="horizontal">
      <a-menu-item key="home">
        <router-link to="/">有风小站</router-link>
      </a-menu-item>
      <a-menu-item key="about">
        <router-link to="/about">关于我</router-link>
      </a-menu-item>
      <a-menu-item key="biaoben">
        <router-link to="/my-biaoben">标本</router-link>
      </a-menu-item>
      <a-menu-item key="100flower">
        <router-link to="/100flower">百花</router-link>
      </a-menu-item>
      <a-menu-item key="bh4ghm">
        <a href="https://autre.cn/bh4ghm" target="_blank">空中通联</a>
      </a-menu-item>
      <!-- <a-menu-item key="login">
        <a v-if="!userStore.userInfo" v-on:click="$login">登录</a>
        <a v-if="userStore.userInfo" :href="userStore.userInfo.profile_url" target="_blank">
          @{{ userStore.userInfo.name }}
        </a>
      </a-menu-item> -->
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import useUserStore from '../store/user/index'
import $login from '../common/login'

const userStore = useUserStore()
if (!userStore.userInfo) {
  userStore.getUserInfo("storage")
}
console.log(userStore.userInfo)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header-menu {
  /* max-width: 800px; */
  margin: 0 auto;
  text-align: center;
}

.ant-menu-horizontal {
  height: 60px;
  line-height: 60px;
}

.ant-menu {
  /* background: #f0f2f5!important; */
}
</style>
