<template>
  <div id="general-page">
    <navigation-bar v-if="header" :returnable="headerData.returnable" :header-text="headerData.text"/>
    <div :class="['content', tabBar?'tab-bar':'', header?'header':'']">
      <router-view @setHeader="setHeader"/>
    </div>
    <tab-bar v-if="tabBar" :items="items" :current-index="currentIndex" @switchTab="switchTab"/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import TabBar from '@/components/TabBar'

export default {
  name: 'TabBarView',
  data () {
    return {
      currentIndex: 0,
      headerData: {
        returnable: true,
        text: 'TeaTalk'
      }
    }
  },
  components: {
    NavigationBar,
    TabBar
  },
  props: {
    tabBar: Boolean,
    items: Array,
    header: Boolean
  },
  methods: {
    switchTab (index) {
      if (index !== this.currentIndex) {
        this.$router.replace(this.items[index].to)
      }
    },
    setHeader (returnable, text) {
      this.headerData = {
        returnable, text
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.tabBar) {
        let toIndex = vm.items.findIndex(item => item.to === to.matched[1].name)
        if (toIndex !== -1) {
          vm.currentIndex = toIndex
        }
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (this.tabBar) {
      let toIndex = this.items.findIndex(item => item.to === to.matched[1].name)
      if (toIndex !== -1) {
        this.currentIndex = toIndex
      }
    }
    next()
  },
  mounted () {
    if (this.$store.getters.logged) {
      console.log('logged!')
    } else {
      this.$store.dispatch('fetchInfo')
    }
  }
}
</script>

<style scoped lang="less">
  @import url('../assets/style/globalVals');

  #general-page {
    .content {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: scroll;

      &.header {
        top: @navigation-bar-display-height
      }

      &.tab-bar {
        bottom: @tab-bar-display-height
      }
    }
  }
</style>
