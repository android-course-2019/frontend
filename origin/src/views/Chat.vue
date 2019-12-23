<template>

</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {
      counterpart: {},
      messages: []
    }
  },
  mounted () {
    let id = this.$route.query['id']
    this.$api.getAllChatHistory(id)
      .then(res => {
        if (res.data.code === this.$apiError.INVALID_PAGING_OFFSET) {
          this.messages = []
          return
        }
        this.messages = res.data.data.data
      })
    this.$api.getUserInfo(id)
      .then(res => {
        this.counterpart = res.data.data
      })
  }
}
</script>

<style scoped>

</style>
