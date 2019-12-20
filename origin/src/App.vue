<template>
  <router-view/>
</template>

<style lang="less">
  body {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .el-message {
    width: 95vw !important;
    min-width: 95vw !important;
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
