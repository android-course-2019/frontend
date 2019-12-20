<template>
  <div class="navigation-bar">
    <div class="navigation-bar-back" @click="$router.back()" v-if="returnable" >
      <i class="el-icon-arrow-left"/>
    </div>
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
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
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
  .navigation-bar-back {
    position: absolute;
    font-size: 22px;
    line-height: 22px;
    left: 12px;
    bottom: 14px;
    z-index: 999;
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
