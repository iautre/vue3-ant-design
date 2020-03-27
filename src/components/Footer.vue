<template>
  <a-layout-footer>
    © 2019 <a :href="'https://autre.me'">向左向右</a>&nbsp;
    <a :href="'https://autre.me'">Autre</a> &nbsp;
    <template v-if="beian">
    <a :href="'http://www.miitbeian.gov.cn/'" target="_blank">陕ICP备13008071号</a>&nbsp;
    <img :src="'http://autre.cn/beian.png'" style="width: 16px; height: auto; max-width: 100%; vertical-align: middle; border: 0;"/>
    <a :href="'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61012402000127'" target="_blank">陕公网安备61012402000127</a>&nbsp; 
    </template>
    <router-link to="/partner" >友友们</router-link>
    
  </a-layout-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      beian: true
    }
  },
  mounted: function () {
    var url = window.location.href
    if (url.indexOf('autre.cn') == -1) {
      this.beian = false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ant-layout-footer{
  text-align: center;
}
</style>
