<template>
  <div id="tab-bar-view">
    <navigation-bar v-if="header"/>
    <router-view/>
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
      currentIndex: 0
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
  }
}
</script>

<style scoped lang="less">

</style>
