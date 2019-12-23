<template>
  <div>
    search
  </div>
</template>

<script>
export default {
  name: 'Search',
  mounted () {
    this.$emit('setHeader', true, '设置')
  }
}
</script>

<style scoped>

</style>
