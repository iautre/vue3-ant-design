<template>
  <!-- <HeaderImg /> -->
  <a-layout>
    <div style="max-width: 900px; width:100%; margin: 0 auto; background: #fff;" class="session-main">
      <Header></Header>
      <a-layout-content style="padding:0 24px;min-height: calc(100vh - 230px);">
        <router-view :key="key"/>
      </a-layout-content>
      <a-divider />
      <Footer style="background: #fff;"></Footer>
    </div>
  </a-layout>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'
import { computed } from '@vue/reactivity'
import HeaderImg from './components/HeaderImg.vue'
const route = useRoute()
const key = computed(()=>route.fullPath)
</script>
<style>
img {
  width: 100%;
}
@media screen and (min-width: 900px) {
  .session-main{
    margin-top: 24px!important;
    margin-bottom: 24px!important;
  }
}
</style>