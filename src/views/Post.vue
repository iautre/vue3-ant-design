<template>
    <a-card :bordered="false" :loading="!data.title">
        <a-card-meta :title="data.title" style="margin-bottom:24px;">
            <template #description>
                <a-space>
                    <div>
                        <edit-outlined />
                        {{ $formatDate(data.created) }}
                    </div>
                    <div>
                        <unordered-list-outlined />
                        <span style="margin-left:5px;" v-for="cate in data.categories">{{ cate.name }}</span>
                    </div>
                    <template v-if="data.thumb.gps">
                        <environment-outlined />
                        {{ data.thumb.gps }}
                    </template>
                </a-space>
            </template>
        </a-card-meta>
        <v-md-preview :text="data.text"></v-md-preview>
        <!-- <v-md-preview-html :html="postStore.data.text"></v-md-preview-html> -->
        <a-space v-if="data.tag && data.tag.length>0">
            <span>tag:</span>
            <a-tag v-for="item in data.tag">#{{ item.name }}</a-tag>
        </a-space>
    </a-card>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import usePostStore from '../store/post/index'
import { EditOutlined, UnorderedListOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import $formatDate from '../common/formatDate'
const route = useRoute()
// 使用 Store
const postStore = usePostStore()
const data = computed(() => postStore.data)
// 使用actions
postStore.getData(parseInt(route.params.id as string))
</script>
<style>
.ant-card-body {
    padding-left: 0;
    padding-right: 0;
}
</style>