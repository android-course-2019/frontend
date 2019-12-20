<template>
  <div>
    search
  </div>
</template>

<script>
export default {
  name: 'Search',
  mounted () {
    let headerTrailElement = document.createElement('div')
    headerTrailElement.innerText = '保存'
    this.$emit('setHeader', true, '设置')
  }
}
</script>

<style scoped>

</style>
