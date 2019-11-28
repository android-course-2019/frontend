<template>
  <div class="navigation-bar">
    <i v-if="returnable" class="el-icon-arrow-left navigation-bar-back-icon"/>
    <div v-else></div>
    <div class="navigation-bar-title">{{headerText}}</div>
    <div class="trailing-content-wrapper">
      <slot name="trailing-content">
        <div></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    returnable: Boolean,
    headerText: String
  }
}
</script>

<style scoped lang="less">
@import url('../assets/style/globalVals');

.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: @navigation-bar-display-height;
  border-block-end: 1px solid #E9E9EB;
  padding-block-start: env(safe-area-inset-top);
  .navigation-bar-back-icon {
    position: absolute;
    font-size: 22px;
    line-height: 22px;
    left: 12px;
    bottom: 14px;
  }
  .navigation-bar-title {
    font-size: 18px;
    position: absolute;
    width: 100%;
    height: @navigation-bar-height;
    line-height: @navigation-bar-height;
    text-align: center;
  }
  .trailing-content-wrapper {
    position: absolute;
    right: 12px;
    bottom: 14px;
    max-height: @navigation-bar-height;
  }
}
</style>
