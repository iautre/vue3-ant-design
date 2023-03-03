<template>
  <a-layout-footer>
    © 2023 <a href="https://autre.me">有风小站</a>&nbsp;
    <a href="https://autre.me">Autre.me</a> &nbsp;
    <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备13008071号</a>&nbsp;
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61012402000254" target="_blank" rel="nofollow">
      <img src="https://img.static.autre.cn/postcard/img/beian.png" style="width: 20px; vertical-align: middle; display: inherit;">
      陕公网安备61012402000254号
    </a> 
    <!-- <router-link to="/partner" >友友们</router-link> -->
  </a-layout-footer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
const beian = window.location.href.indexOf('autre.cn') !== -1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ant-layout-footer{
  text-align: center;
  background: #fff;
}
</style>
