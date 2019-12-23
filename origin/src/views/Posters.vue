<template>
  <div id="posters-page">
    <div class="search-bar-wrapper row-flex-container main-axis-center second-axis-between">
      <el-avatar v-if="logged" :size="40" class="avatar" :src="userBasicInfo.avatarUrl"/>
      <el-avatar v-else :size="40" class="avatar" icon="el-icon-milk-tea"/>
<!--      <router-link class="search-bar row-flex-container main-axis-center" to="search">-->
<!--        <i class="el-icon-search"/>搜索-->
<!--      </router-link>-->
      <router-link to="search">
        <i class="el-icon-setting"/>
      </router-link>
    </div>
    <div class="page-content">
      <el-tabs v-model="tab" stretch>
        <el-tab-pane label="关注的人" name="followed">
          <div class="posters-container" :v-infinite-scroll="loadMoreFollowed"
               :infinite-scroll-disabled="followedComplete">
            <div v-for="(poster, index) in followedPosters" :key="index" class="item">
              <Poster :detail="poster"/>
            </div>
            <div class="footnote item">
              <span v-if="followedLoading">加载中</span>
              <span v-else-if="followedComplete">没有更多啦</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="热门点评" name="hot">
          <div class="posters-container" :v-infinite-scroll="loadMoreHot"
               :infinite-scroll-disabled="hotComplete">
            <div v-for="(poster, index) in hotPosters" :key="index" class="item">
              <Poster :detail="poster"/>
            </div>
            <div class="footnote item">
              <span v-if="hotLoading">加载中</span>
              <span v-else-if="hotComplete">没有更多啦</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="float-add row-flex-container main-axis-center second-axis-center"
         @click="$router.push('/createPoster')">
      <i class="el-icon-plus"/>
    </div>
  </div>
</template>

<script>
import Poster from '@/components/Poster'
export default {
  name: 'Posters',
  components: {
    Poster
  },
  data () {
    return {
      tab: 'followed',
      followedOffset: 0,
      hotOffset: 0,
      followedComplete: false,
      hotComplete: false,
      followedLoading: false,
      hotLoading: false,
      followedPosters: [],
      hotPosters: []
    }
  },
  computed: {
    logged () {
      return this.$store.getters.logged
    },
    userBasicInfo () {
      return this.$store.state.detail
    }
  },
  mounted () {
    this.loadMoreFollowed()
    this.loadMoreHot()
  },
  methods: {
    loadMoreFollowed () {
      this.followedLoading = true
      this.$api.getMyFollowedPosterInPage(this.followedOffset, 50)
        .then(res => {
          if (res.data.code === this.$apiError.INVALID_PAGING_OFFSET) {
            this.followedComplete = true
            return
          }
          let data = res.data.data
          if (data.next === -1) {
            this.followedComplete = true
          } else {
            this.followedOffset = data.next
          }
          this.followedPosters.push(...data.data)
        })
        .finally(_ => {
          this.followedLoading = false
        })
    },
    loadMoreHot () {
      this.hotLoading = true
      this.$api.getHotPostersInPage(this.hotOffset, 50)
        .then(res => {
          if (res.data.code === this.$apiError.INVALID_PAGING_OFFSET) {
            this.hotComplete = true
            return
          }
          let data = res.data.data
          if (data.next === -1) {
            this.hotComplete = true
          } else {
            this.hotOffset = data.next
          }
          this.hotPosters.push(...data.data)
        })
        .finally(_ => {
          this.hotLoading = false
        })
    }
  }
}
</script>

<style lang="less">
@import url('../assets/style/globalVals.less');
#posters-page {
  position: relative;
  background-color: #f0f0f0;
  .search-bar-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: @primary-color-lighter;
    padding: 10px 15px;
    border-block-end: 1px solid #ccc;
    i.el-icon-setting {
      font-size: 30px;
      color: @primary-color;
    }
    .search-bar {
      height: 30px;
      flex-grow: 1;
      margin: 0 15px;
      border-radius: 4px;
      background-color: fade(@primary-color, 30);
      color: #666;
      padding: 0 15px;
      i {
        padding-inline-end: 10px;
      }
    }
  }
  .page-content {
    padding-block-start: 60px;
    min-height: calc(100vh - @tab-bar-display-height - 60px);
    .el-tabs__nav-scroll {
      background-color: @primary-color-lighter;
    }
    .posters-container {
      padding: 0 10px;
      .item:nth-child(1n+2) {
        margin-block-start: 18px;
      }
      .footnote {
        align-self: center;
        font-size: 14px;
        color: #666;
        text-align: center;
      }
    }
  }
  .float-add {
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: @primary-color;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: white;
  }
}
</style>
