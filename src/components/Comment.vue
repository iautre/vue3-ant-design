<template>
  <div v-if="show!==0">
  <a-list :data-source="comments" item-layout="vertical">
    <template #header>
      {{ `${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}` }}
      <a-comment v-if="replyId === 0">
        <template #avatar>
          <a-avatar :src="replyavatar" :alt="replyName" />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="value" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              {{submitBtnName}}
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment style="width:100%;" :author="item.author" :avatar="item.avatar" :content="item.text" :datetime="item.datetime">
          <template #actions>
            <span key="comment-nested-reply-to" @click="replyTo(item.coid)">Reply to</span>
          </template>
          <a-comment v-if="replyId === item.coid">
            <template #avatar>
              <a-avatar :src="replyavatar" :alt="replyName" />
            </template>
            <template #content>
              <a-form-item>
                <a-textarea v-model:value="value" :rows="4" />
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                  {{submitBtnName}}
                </a-button>
              </a-form-item>
            </template>
          </a-comment>
          <a-list :data-source="item.subComments" item-layout="vertical">
            <template #renderItem="{ item:subItem }">
              <a-list-item>
                <a-comment style="width:100%;" :author="subItem.author" :avatar="subItem.avatar" :content="subItem.text" :datetime="subItem.datetime">
                  <template #actions>
                    <span key="comment-nested-reply-to" @click="replyTo(subItem.coid)">Reply to</span>
                  </template>
                  <a-comment v-if="replyId === subItem.coid">
                    <template #avatar>
                      <a-avatar :src="replyavatar" :alt="replyName" />
                    </template>
                    <template #content>
                      <a-form-item>
                        <a-textarea v-model:value="value" :rows="4" />
                      </a-form-item>
                      <a-form-item>
                        <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                          {{submitBtnName}}
                        </a-button>
                      </a-form-item>
                    </template>
                  </a-comment>
                </a-comment>
              </a-list-item>
            </template>
          </a-list>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import useCommentStore from '../store/post/comment'
import useUserStore from '../store/user/index'
import login from '../common/login'
const show = ref<number>(0)

const commentStore = useCommentStore()
const comments = computed(() => commentStore.comments)
const route = useRoute()
commentStore.getComments({ postId: route.params.id })
const submitting = computed(() => commentStore.submitting)
const userStore = useUserStore()
const submitBtnName = computed(()=>userStore.userInfo ? '提交': '登陆')
const replyName = computed(()=>userStore.userInfo ? userStore.userInfo.name : '未登陆')
const replyavatar = computed(()=> userStore.userInfo ? userStore.userInfo.avatar : 'https://joeschmoe.io/api/v1/random')
const value = ref<string>('');
const replyId = ref<number>(0)
const handleSubmit = () => {
  if (!userStore.userInfo){
    login()
  }
  if (!value.value) {
    return;
  }
  commentStore.submitComment({coid: replyId, postId: route.params.id, text: value.value})
};
const replyTo = (idn: number) => {
  replyId.value = idn
};
</script>



