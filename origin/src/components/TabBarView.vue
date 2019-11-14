<template>
  <div id="tab-bar-view">
    <router-view/>
    <div id="tab-bar" class="row-flex-container main-axis-center second-axis-space">
      <div v-for="(item,index) in tabBarItems" class="tab-bar-item" @click="switchTab(index)" :key="index">
        <div class="tab-bar-item col-flex-container main-axis-center">
          <i :class="`${item.icon} ${currentIndex===index?'selected':''}`"></i>
          <div :class="`text ${currentIndex===index?'selected':''}`">{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabBarConfig from '@/components/TabBarConfig'

export default {
  name: 'TabBarView',
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    tabBarItems () {
      return tabBarConfig
    }
  },
  methods: {
    switchTab (index) {
      if (index !== this.currentIndex) {
        this.$router.replace(tabBarConfig[index].path)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let toIndex = tabBarConfig.findIndex(item => item.path === to.matched[1].path)
      if (toIndex !== -1) {
        vm.currentIndex = toIndex
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    let toIndex = tabBarConfig.findIndex(item => item.path === to.matched[1].path)
    if (toIndex !== -1) {
      this.currentIndex = toIndex
    }
    next()
  }
}
</script>

<style scoped lang="less">
  #tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: env(safe-area-inset-bottom);
    height: var(--tab-bar-display-height);
    border-block-start: 1px solid #E9E9EB;

    .tab-bar-item {
      i {
        font-size: 30px;
      }
      .text {
        font-size: 12px;
      }
      .selected {
        color: var(--primary-color);
      }
    }
  }
</style>
