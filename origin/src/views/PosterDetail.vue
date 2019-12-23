<template>
  <div id="poster-detail-page" class="col-flex-container">
    <div class="user-info row-flex-container main-axis-center">
      <el-avatar :size="50" :src="poster.sendBy.avatarUrl"/>
      <div class="text-info col-flex-container">
        <span class="nick-name">{{poster.sendBy.nickName}}</span>
        <span class="time-text">发布于 {{$timeStringify(poster.createTime)}}</span>
      </div>
      <div style="flex: 1"/>
      <el-button v-if="poster.followed" round type="primary" @click="switchFollow">已关注</el-button>
      <el-button v-else round type="primary"  @click="switchFollow">关  注</el-button>
    </div>
    <div class="shop">
      点评了{{poster.drinks[0].brand.brandName}}
    </div>
    <div class="content col-flex-container">
      <span class="header">点评详情</span>
      <div class="text">{{poster.content}}</div>
    </div>
    <div class="drinks">
      <span class="header">点单列表</span>
      <div class="items row-flex-container">
        <div v-for="drink in poster.drinks" :key="drink.drinkId" class="item">{{drink.drinkName}}</div>
      </div>
    </div>
    <div class="images" v-if="poster.images.length > 0">
      <span class="header">图片</span>
      <div class="row-flex-container" style="flex-wrap: wrap;">
        <div class="item-wrapper" v-for="image in poster.images" :key="image.posterId">
          <el-image fit="cover" :src="image.url" class="item image"/>
        </div>
      </div>
    </div>
    <div class="float-btn col-flex-container main-axis-center second-axis-center" @click="switchLike">
      <i v-if="poster.liked" class="el-icon-star-on"/>
      <i v-else class="el-icon-star-off"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PosterDetail',
  data () {
    return {
      poster: {}
    }
  },
  mounted () {
    let id = this.$route.query['id']
    this.$api.getPosterDetail(id)
      .then(res => {
        this.poster = res.data.data
      })
    this.$emit('setHeader', true, '点评详情')
  },
  methods: {
    switchLike () {
      if (this.poster.liked) {
        this.$api.unlikePoster(this.poster.posterId)
          .then(_ => {
            this.$message.success('取消点赞成功！')
            this.poster.liked = false
          })
      } else {
        this.$api.likePoster(this.poster.posterId)
          .then(_ => {
            this.$message.success('点赞成功！')
            this.poster.liked = true
          })
      }
    },
    switchFollow () {
      if (this.poster.followed) {
        this.$api.unfollow(this.poster.sendBy.userId)
          .then(_ => {
            this.$message.success('取消关注成功！')
            this.poster.followed = false
          })
      } else {
        this.$api.follow(this.poster.sendBy.userId)
          .then(_ => {
            this.$message.success('关注成功！')
            this.poster.followed = true
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import url('../assets/style/globalVals');
  #poster-detail-page {
    min-height: calc(100vh - @navigation-bar-display-height - 32px);
    background-color: @primary-color-lighter;
    padding: 16px;
    .user-info {
      height: 60px;
      padding: 10px;
      background-color: transparent;
      border-radius: 8px;
      margin-block-end: 16px;
        .text-info {
          margin-inline-start: 14px;
          flex-grow: 1;
          .nick-name {
            font-size: 18px;
            font-weight: bold;
            text-overflow: ellipsis;
          }
          .content {
            margin-top: 6px;
            font-size: 14px;
            font-weight: lighter;
            max-width: calc(100vw - 150px);
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .time-text {
          font-size: 14px;
          color: #ccc;
        }
      &.footnote {
        margin-block-start: 10px;
        font-size: 14px;
        color: #666;
      }
    }
    .shop {
      font-size: 14px;
      color: #999;
      margin-block-end: 20px;
    }
    .content {
      .header {
        font-size: 20px;
        font-weight: bold;
        margin-block-end: 5px;
      }
      .text {
        border-radius: 8px;
        border: 1px solid #aaa;
        padding: 8px;
      }
      margin-block-end: 20px;
    }
    .drinks {
      .header {
        font-size: 20px;
        font-weight: bold;
        margin-block-end: 8px;
      }
      .items {
        flex-wrap: wrap;
        .item {
          margin: 3px;
          padding: 5px;
          background-color: @primary-color;
          border-radius: 3px;
          color: #fafafa;
        }
      }
      margin-block-end: 20px;
    }
    .brand-shop-wrapper {
      .select:first-child {
        margin-inline-end: 10px;
      }
      margin-block-end: 10px;
    }
    .content-input {
      margin-block-end: 10px;
    }
    .drink-select {
      width: 100%;
      margin-block-end: 10px;
    }
    .images {
      width: 100%;
      flex-wrap: wrap;
      align-content: center;
      .header {
        font-size: 20px;
        font-weight: bold;
        margin-block-end: 8px;
      }
      .item-wrapper {
        @size: calc((100vw - 32px - 60px) / 3);
        width: @size;
        height: @size;
        padding: 10px;
        flex-wrap: wrap;
        .item {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: 2px #aaa dashed;
        }
      }
    }
    .float-btn {
      position: fixed;
      right: 20px;
      bottom: 20px;
      height: 40px;
      width: 40px;
      background-color: @primary-color;
      color: white;
      font-size: 20px;
      font-weight: bolder;
      border-radius: 20px;
    }
  }
</style>
