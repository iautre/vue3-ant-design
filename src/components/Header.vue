<template>
  <!-- <HeaderImg /> -->
  <a-layout-header class="header">
    <Menu />
  </a-layout-header>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import Menu from "@/components/Menu.vue"
import HeaderImg from './HeaderImg.vue'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.ant-layout-header {
  padding: 0 !important;
  background: rgb(116, 103, 103) !important;
  border-bottom-color: #e7e7e7;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  height: 60px !important;
  line-height: 60px !important;
}
</style>
