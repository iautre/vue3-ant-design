<template>
  <a-card hoverable style="width: 100%;">
    <template #cover>
      <img height="240" :src="headImage" />
    </template>
  </a-card>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import usePostStore from '../store/post/index'
const postStore = usePostStore()
const headImage = computed(() => postStore.headImg + '!meheader')
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
