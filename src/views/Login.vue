<template>
  <div class="login">
    <h1>登录中</h1>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      if (this.$route.query.code) {
        var code = this.$route.query.code
        localStorage.setItem('autre_user_login_code', code)
        // this.$store.dispatch('getuserInfo',code)
        window.close()
      }
    }
  },
  mounted: function () {
    if (this.$store.state.userInfo) {
      this.$router.push({
        path: '/'
      })
    }
    this.login()
  }
}
</script>
