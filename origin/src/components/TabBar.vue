<template>
  <div id="tab-bar" class="row-flex-container main-axis-center second-axis-space">
    <div v-for="(item,index) in items" class="tab-bar-item" @click="$emit('switchTab', index)" :key="index">
      <div class="tab-bar-item col-flex-container main-axis-center">
        <i :class="`${item.icon} ${currentIndex===index?'selected':''}`"/>
        <div :class="`text ${currentIndex===index?'selected':''}`">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    items: Array,
    currentIndex: Number
  },
  methods: {
    // switchTab: index => {
    //   this.$emit('switchTab', index)
    // }
  }
}
</script>

<style scoped lang="less">
  @import url('../assets/style/globalVals');
  #tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-block-end: env(safe-area-inset-bottom);
    height: @tab-bar-display-height;
    border-block-start: 1px solid #E9E9EB;

    .tab-bar-item {
      i {
        font-size: 30px;
      }
      .text {
        font-size: 12px;
      }
      .selected {
        color: @primary-color;
      }
    }
  }
</style>
