<template>
  <a-layout-header>
    <Menu />
  </a-layout-header>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "Header",
  components: {
    Menu
  },
  mounted: function() {
    var url = window.location.href
    if (url.indexOf("https") < 0 || url.indexOf("www.autre.me") > 0) {
      url = process.env.NODE_ENV === 'development' ? url : url.replace("http:", "https:")
      url = url.replace("www.autre.me", "autre.me")
      window.location.replace(url);
    }
    let ua = navigator.userAgent.toLowerCase()
    if (url.indexOf("autre.cn") > 0 && !/micromessenger/.test(ua)) {
      url = url.replace("www.autre.cn", "autre.me")
      url = url.replace("autre.cn", "autre.me")
      window.location.replace(url)
    }
  },
  computed: {
    webTitle() {
      return this.$store.state.webTitle
    }
  },
  watch: {
    webTitle(newName, oldName) {
      this.common.setTitle(newName)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ant-layout-header {
  background: #fff;
  border-bottom-color: #e7e7e7;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  height: 60px;
  line-height: 60px;
}
</style>
