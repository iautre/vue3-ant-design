<template>
    <a-card :bordered="false" :loading="!data.title">
        <a-card-meta :title="data.title" style="margin-bottom:24px;">
        </a-card-meta>
        <v-md-preview :text="data.text"></v-md-preview>
        <!-- <v-md-preview-html :html="postStore.data.text"></v-md-preview-html> -->
    </a-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import usePostStore from '../store/post/index'
const route = useRoute()
// 使用 Store
const postStore = usePostStore()
const data = computed<{title:string|null;text:string|null;}>(():{title:string|null;text:string|null;} => postStore.page)
// 使用actions
postStore.getPage(route.params.slug as string)
</script>
<style>
.ant-card-body {
    padding-left: 0;
    padding-right: 0;
}
</style>