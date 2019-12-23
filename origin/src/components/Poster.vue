<template>
  <div class="poster row-flex-container" @click="toDetail">
    <el-avatar :src="detail.sendBy.avatarUrl" :size="50"/>
    <div class="text-info col-flex-container">
      <span class="nick-name">{{detail.sendBy.nickName}}</span>
      <span class="drinks">点评了{{drinkPreview}}</span>
      <span class="content">{{detail.content}}</span>
<!--  address-->
      <span class="time">发布于 {{$timeStringify(detail.createTime)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Poster',
  props: {
    detail: Object
  },
  computed: {
    drinkPreview () {
      let drinks = this.detail.drinks
      if (drinks[0].brand) {
        if (drinks.length > 1) {
          return `${drinks[0].brand.brandName} ${drinks[0].drinkName}等${drinks.length}种`
        } else return `${drinks[0].brand.brandName} ${drinks[0].drinkName}`
      } else return `${drinks[0].drinkName}`
    }
  },
  methods: {
    toDetail () {
      this.$router.push(`/posterDetail?id=${this.detail.posterId}`)
    }
  }
}
</script>

<style scoped lang="less">
.poster {
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  .text-info {
    margin-inline-start: 12px;
    flex-grow: 1;
    .nick-name {
      font-size: 18px;
      font-weight: bold;
      margin-block-end: 4px;
      margin-block-start: 4px;
    }
    .drinks {
      font-size: 12px;
      color: #666;
      margin-block-end: 12px;
    }
    .content {
      font-size: 14px;
      line-height: 16px;
      max-height: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-block-end: 4px;
    }
    .time {
      font-size: 12px;
      color: #666;
      align-self: flex-end;
      margin-inline-end: 15px;
      margin-block-end: 5px;
    }
  }
}
</style>
