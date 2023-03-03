<template>
  <div class="login">
    <h1>登录中</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
if (route.query.code) {
    const code = route.query.code as string
    localStorage.setItem('autre_user_login_code', code)
    window.close()
}
</script>
