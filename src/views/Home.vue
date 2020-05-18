<template>
  <div>
    <a-list itemLayout="vertical" size="large" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        <a-list-item-meta>
          <router-link :to="item.pathinfo" slot="title">{{item.title}}</router-link>
        </a-list-item-meta>
        <img
          width="100%"
          alt="logo"
          v-if="item.thumb.firstimg"
          :src="common.replaceFirstImgUrl(item.thumb.firstimg)"
        />
        <div slot="actions" class="icons-list">
          <a-icon type="edit" />
          {{common.formatDate(item.created)}}
          <a-icon type="bars" />
          <template v-for="cate in item.categories">{{cate.name}}</template>
          <template v-if="item.thumb.gps">
            <a-icon type="environment" />
            {{ item.thumb.gps }}
          </template>
        </div>
      </a-list-item>
    </a-list>
    <router-link :to="nextPage">下一页</router-link>
  </div>
</template>
<script>
import Spin from "@/components/Spin.vue";
export default {
  components: {
    Spin
  },
  data() {
    return {
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ],
      pageParam: {
        pageSize: 8,
        page: 1
      }
    };
  },
  computed: {
    listData() {
      return this.$store.state.listData;
    },
    pagination() {
      return {
        onChange: page => {
          this.pageParam.page = page;
          this.getData();
        },
        pageSize: this.pageParam.pageSize
      };
    },
    nextPage() {
      return "/page/" + (this.pageParam.page + 1);
    },
    routrePage() {
      return parseInt(this.$route.params.page);
    }
  },
  methods: {
    getData: function() {
      if (this.routrePage) {
        this.pageParam.page = this.routrePage;
      }
      this.$store.dispatch("setLoading", true);
      this.$store.dispatch("getListData", this.pageParam);
    }
  },
  mounted: function() {
    this.getData();
  },
  watch: {
    $route: "getData"
  }
};
</script>

<style scoped lang="less">
.content-list {
  width: 100%;
}
.icons-list {
  margin-left: -8px;
}
.icons-list .anticon {
  margin-left: 8px;
  margin-right: 6px;
}
.ant-list-item-meta {
  margin-bottom: 0;
}
</style>
