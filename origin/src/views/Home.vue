<template>
  <div id="home-page">
    <div class="top-block">
      <div class="search-bar-wrapper row-flex-container main-axis-center second-axis-between">
        <el-avatar class="avatar"/>
        <router-link class="search-bar row-flex-container main-axis-center" to="search">
          <i class="el-icon-search"/>搜索
        </router-link>
        <router-link to="search">
          <i class="el-icon-setting"/>
        </router-link>
      </div>
    </div>
    <div class="content-container col-flex-container">
      <div v-if="logged" class="info-block my-info-container col-flex-container">
        <!--suppress HtmlUnknownTarget -->
        <el-avatar :size="100" :src="myBasicInfo.avatarUrl" class="avatar"/>
        <el-button style="align-self: flex-end;margin-inline-end: 20px;" round>修改信息</el-button>
        <div class="my-text-info">
          <div>{{myBasicInfo.nickName}}</div>
        </div>
        <div style="height: 1px;background-color: #888"/>
        <div class="follow-container row-flex-container main-axis-center">
          <div style="vertical-align: baseline">
            <span>{{myInfo.followerNum}}</span> 个粉丝
          </div>
          <div style="vertical-align: baseline;margin-inline-start: 12px;">
            <span>{{myInfo.followeeNum}}</span> 个关注
          </div>
        </div>
      </div>
      <div v-if="logged" class="info-block poster-container">
        <el-tabs v-model="posterTab" stretch>
          <el-tab-pane label="我发布的" name="created" v-infinite-scroll="loadMoreCreated">
            <div class="poster-item" v-for="(index, item) in myInfo.createdPosters" :key="index">
              {{item}}
            </div>
            <div v-if="createdStatus===1">加载中</div>
            <div v-if="myInfo.createdPosters.length===0&&createdStatus!==1">找不到点评，快去写一个吧～</div>
            <div v-if="myInfo.createdPosters.length!==0&&createdStatus===2">没有更多啦</div>
          </el-tab-pane>
          <el-tab-pane label="我点赞的" name="liked">
            <div class="poster-item" v-for="(index, item) in myInfo.likedPosters" :key="index">
              {{item}}
            </div>
            <div v-if="likedStatus===1">加载中</div>
            <div v-if="myInfo.likedPosters.length===0&&likedStatus!==1">找不到点评，快去赞一个吧～</div>
            <div v-if="myInfo.likedPosters.length!==0&&likedStatus===2">没有更多啦</div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="!logged" class="info-block not-logged-info-container col-flex-container">
        <el-avatar :size="100" icon="el-icon-milk-tea" class="avatar"/>
        <router-link style="align-self: flex-end;margin-inline-end: 20px;" to="login">
          <el-button round>登陆/注册</el-button>
        </router-link>
        <div class="my-text-info">
          <div>登陆获取更多信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      myInfo: {
        createdPosters: [],
        likedPosters: [],
        followerNum: null,
        followeeNum: null
      },
      posterTab: 'created',
      createdNext: 0,
      likedNext: 0,
      createdStatus: 0,
      likedStatus: 0
    }
  },
  computed: {
    logged () {
      return this.$store.getters.logged
    },
    myBasicInfo () {
      return this.$store.state.detail
    }
  },
  mounted () {
    if (!this.logged) return
    this.$api.getMyFollow()
      .then(res => {
        if (res.data.code === 200) {
          this.myInfo.followerNum = res.data.data.followerNum
          this.myInfo.followeeNum = res.data.data.followeeNum
        }
      })
  },
  methods: {
    loadMoreCreated () {
      if (!this.logged) return
      if (this.createdStatus !== 0) return
      this.createdStatus = 1
      this.$api.getMyCreatedPostersInPage(this.createdNext, 10)
        .then(res => {
          if (res.data.code === -202) {
            this.createdStatus = 2
            return
          }
          let data = res.data.data
          this.myInfo.createdPosters.push(data.data)
          if (data.next === -1) {
            this.createdStatus = 2
          } else {
            this.createdNext = data.next
            this.createdStatus = 0
          }
        })
    },
    loadMoreLiked () {
      if (!this.logged) return
      if (this.likedStatus !== 0) return
      this.likedStatus = 1
      this.$api.getMyLikedPostersInPage(this.likedNext, 10)
        .then(res => {
          if (res.data.code === -202) {
            this.likedStatus = 2
            return
          }
          let data = res.data.data
          this.myInfo.likedPosters.push(data.data)
          if (data.next === -1) {
            this.likedStatus = 2
          } else {
            this.likedNext = data.next
            this.likedStatus = 0
          }
        })
    }
  }
}
</script>

<style lang="less">
  @import url(../assets/style/globalVals);
  #home-page {
    position: relative;
    background-color: @primary-color-light;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-block {
      width: 100%;
      height: 120px;
    }
    .search-bar-wrapper {
      height: 50px;
      background-color: transparent;
      padding: 10px 12px;
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
      .avatar {
        height: 30px;
        width: 30px;
        i {
          font-size: 20px;
          line-height: inherit;
        }
      }
    }
    .content-container {
      background-color: #ddd;
      position: relative;
      width: 100%;
      min-height: calc(100vh - @tab-bar-display-height - 120px);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      .info-block {
        &:nth-child(1n+2) {
          margin-block-start: 10px;
        }
        background-color: white;
      }
      .my-info-container, .not-logged-info-container {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 20px;
        position: relative;
        .avatar {
          position: absolute;
          width: 100px;
          height: 100px;
          left: 12px;
          top: -48px;
          i {
            font-size: 70px;
            line-height: inherit;
          }
        }
        .my-text-info {
          margin-block-start: 20px;
          margin-inline-start: 10px;
          margin-block-end: 20px;
          font-size: 18px;
        }
        .follow-container {
          padding: 20px 10px;
          font-size: 12px;
          color: #666;
          span {
            color: @primary-color;
            font-size: 20px;
          }
        }
      }
      .not-logged-info-container {
        flex-grow: 1;
      }
      .poster-container {
        padding: 0 12px;
      }
    }
  }
</style>
