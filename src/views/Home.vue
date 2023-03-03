<template>
  <div>
    <a-list itemLayout="vertical" size="large" :dataSource="postStore.list">
      <template #renderItem="{ item }">
        <a-list-item style="padding: 24px 0;">
          <a-list-item-meta>
            <template #title>
              <router-link :to="item.pathinfo">{{ item.title }}</router-link>
            </template>
            <template #description>
              <router-link :to="item.pathinfo">
                <a-card hoverable style="width: 100%" v-if="item.thumb.firstimg">
                  <template #cover>
                    <img :src="item.thumb.firstimg+'!meindex'" />
                  </template>
                </a-card>
              </router-link>
            </template>
          </a-list-item-meta>
          <template #actions>
            <div>
              <edit-outlined />
              {{ $formatDate(item.created) }}
            </div>
            <div>
              <unordered-list-outlined />
              <span style="margin-left:5px;" v-for="cate in item.categories"> {{ cate.name }} </span>
            </div>
            <template v-if="item.thumb.gps">
              <environment-outlined />
              {{ item.thumb.gps }}
            </template>
          </template>
        </a-list-item>
      </template>
      <template #footer>
        <a-space align="center">
        <router-link v-if="route.params.page" :to="prePage"><a-button>上一页</a-button></router-link>
        <router-link :to="nextPage"><a-button>下一页</a-button></router-link>
        </a-space>
      </template>
    </a-list>
    <!-- <router-link :to="nextPage">下一页</router-link> -->
  </div>
</template>
<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import usePostStore from '../store/post/index'
import { EditOutlined, UnorderedListOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import { computed } from '@vue/reactivity'
import $formatDate from '../common/formatDate'

// 使用 Store
const postStore = usePostStore()
const route = useRoute()
// 使用actions
postStore.getList({ page: parseInt(route.params.page as string) })
const nextPage = computed<string>(():string =>{
  if (route.params.page){
    const page: string = route.params.page as string
    const pageInt = parseInt(page) + 1
    return '/page/' +  pageInt
  }
  return '/page/2'
})
const prePage = computed<string>(():string =>{
  if (route.params.page){
    const page: string = route.params.page as string
    if (page === '2'){
      return '/'
    }
    const pageInt = parseInt(page) - 1
    return '/page/' +  pageInt
  }
  return ''
})
</script>