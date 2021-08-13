<template>
  <div class="page_content">
    <div v-html="common.markdown(pageData.text)"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    pageData () {
      return this.$store.state.pageData
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    getData: function () {
      this.$store.dispatch('setLoading', true)
      this.$store.dispatch('getPageData', this.$route.params.page_id)
    }
  },
  mounted: function () {
    this.getData()
  },
  watch: {
    '$route': 'getData'
  }
}
</script>

<style scoped lang="less">

</style>
