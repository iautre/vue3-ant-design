<template>
<a-spin :spinning="spinning">
  <a-layout>
    <Header />
    <a-layout-content>
      <router-view/>
    </a-layout-content>
    <Footer />
    <BackTop />
  </a-layout>
</a-spin>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import BackTop from '@/components/BackTop.vue'

export default {
  name: 'home',
  components: {
    Header,
    Footer,
    BackTop
  },
  computed:{
    spinning(){
      return this.$store.state.loading
    }
  }
}
</script>

<style lang="less">
.ant-layout-content {
  max-width: 800px;
  width: 100%;
  margin: 10px auto;
  padding: 20px;
  background: #fff;
  min-height: 600px;
}
img {
    width: 100%;
}
</style>
