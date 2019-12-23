<template>
  <div id="message-page">
    <div class="search-bar-wrapper row-flex-container main-axis-center second-axis-between">
      <el-avatar v-if="logged" :size="40" class="avatar" :src="userBasicInfo.avatarUrl"/>
      <el-avatar v-else :size="40" class="avatar" icon="el-icon-milk-tea"/>
      <div class="title">消 息</div>
      <router-link to="search">
        <i class="el-icon-setting"/>
      </router-link>
    </div>
    <div class="chat-item-list col-flex-container">
      <router-link class="chat-item chat row-flex-container main-axis-center" v-for="(chat, index) in chats"
                   :to="`/chat?id=${chat.counterpartId}`" :key="index">
        <el-avatar :size="50" :src="chat.counterpart.avatarUrl"/>
        <div class="text-info col-flex-container">
          <span class="nick-name">{{chat.counterpart.nickName}}</span>
          <span class="content">{{chat.content}}</span>
        </div>
        <span class="time-text">{{$timeStringify(chat.sendTime)}}</span>
      </router-link>
      <div class="chat-item footnote col-flex-container main-axis-center">
        <span v-if="!logged">请先登录再开始聊天</span>
        <span v-else-if="chats.length===0">暂时没有消息</span>
        <span v-else>没有啦</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data () {
    return {
      chats: []
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
    this.$api.getMyMessageList()
      .then(res => {
        if (res.data.code !== 200) return
        this.chats = res.data.data
      })
  }
}
</script>

<style scoped lang="less">
  @import url('../assets/style/globalVals.less');
  #message-page {
    .search-bar-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      background-color: @primary-color-lighter;
      padding: 10px 15px;
      border-block-end: 1px solid #ccc;
      .title {
        font-size: 20px;
        color: #666;
        justify-self: center;
      }
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
    .chat-item-list {
      padding-top: 60px;
      background-color: #f0f0f0;
      min-height: calc(100vh - @tab-bar-display-height - 60px);
      .chat-item {
        height: 60px;
        padding: 10px;
        &.chat {
          background-color: white;
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
          &:nth-child(1n+1) {
            border-top: 1px solid #cccccc;
          }
        }
        &.footnote {
          margin-block-start: 10px;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
</style>
