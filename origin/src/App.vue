<template>
  <router-view/>
</template>

<style lang="less">
  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 0;
  }

  :root {
    --primary-color: #E4B660;
    --tab-bar-height: 58px;
    --tab-bar-display-height: calc(var(--tab-bar-height) + env(safe-area-inset-bottom));
  }

  .row-flex-container {
    display: flex;
    flex-direction: row;
  }

  .col-flex-container {
    display: flex;
    flex-direction: column;
  }

  .main-axis-center.row-flex-container,
  .main-axis-center.col-flex-container{
    align-items: center;
  }

  .second-axis-center.row-flex-container,
  .second-axis-center.col-flex-container{
    justify-content: center;
  }

  .second-axis-space.row-flex-container,
  .second-axis-space.col-flex-container{
    justify-content: space-around;
  }
</style>
