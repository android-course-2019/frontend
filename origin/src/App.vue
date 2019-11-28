<template>
  <router-view/>
</template>

<style lang="less">
  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 0;
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

  .second-axis-between.row-flex-container,
  .second-axis-between.col-flex-container{
    justify-content: space-between;
  }
</style>
