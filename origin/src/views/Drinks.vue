<template>
  <div id="drink-page">

    <div class="content">
      <div class="filter-bar col-flex-container main-axis-center">
        <el-select class="brand-filter" v-model="chosenBrand" placeholder="品牌筛选" clearable @change="doFilter">
          <el-option v-for="brand in brands" :key="brand.brandId" :label="brand.brandName" :value="brand.brandId"/>
        </el-select>
        <el-input placeholder="搜索饮品" v-model="searchInput" class="search-bar" clearable>
          <el-button slot="append" icon="el-icon-search" @click="doSearch"/>
        </el-input>
      </div>
      <div class="results col-flex-container main-axis-center">
        <Drink v-for="drink in drinks" :key="drink.drinkId" :drink="drink" class="result-item"/>
      </div>
    </div>
    <div class="search-bar-wrapper row-flex-container main-axis-center second-axis-between">
      <el-avatar v-if="logged" :size="40" class="avatar" :src="userBasicInfo.avatarUrl"/>
      <el-avatar v-else :size="40" class="avatar" icon="el-icon-milk-tea"/>
      <router-link to="search">
        <i class="el-icon-setting"/>
      </router-link>
    </div>
  </div>

</template>

<script>
import Drink from '@/components/Drink'
export default {
  name: 'Drinks',
  components: {
    Drink
  },
  data () {
    return {
      brands: [],
      chosenBrand: '',
      drinks: [],
      searchInput: '',
      allDrinks: []
    }
  },
  computed: {
    userBasicInfo () {
      return this.$store.state.detail
    },
    logged () {
      return this.$store.getters.logged
    }
  },
  methods: {
    doFilter () {
      this.searchInput = ''
      if (this.chosenBrand === '') {
        this.drinks = this.allDrinks
        return
      }
      this.drinks = this.allDrinks.filter(item => {
        return item.brand.brandId === this.chosenBrand
      })
    },
    doSearch () {
      this.chosenBrand = ''
      if (this.searchInput === '') {
        this.drinks = this.allDrinks
        return
      }
      this.$api.searchDrinks(this.searchInput)
        .then(res => {
          this.drinks = res.data.data
        })
    }
  },
  mounted () {
    this.$api.getAllDrinks()
      .then(res => {
        this.allDrinks = res.data.data
        this.drinks = res.data.data
      })
    this.$api.getAllBrands()
      .then(res => {
        this.brands = res.data.data
      })
  }
}
</script>

<style lang="less">
@import url("../assets/style/globalVals");
#drink-page {
  background-color: #F0F0F0;
  .search-bar-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: @primary-color-lighter;
    padding: 10px 15px;
    i.el-icon-setting {
      font-size: 30px;
      color: @primary-color;
    }
    .search-bar {
      height: 30px;
      flex-grow: 1;
      margin: 0 15px;
      border-radius: 4px;
      background-color: fade(@primary-color, 30);
      color: #666;
      padding: 0 15px;
      i {
        padding-inline-end: 10px;
      }
    }
  }
  .content {
    padding-block-start: 60px;
    min-height: calc(100vh - @tab-bar-display-height - 60px);
    .filter-bar {
      padding: 10px 15px;
      background-color: @primary-color-lighter;
      .brand-filter {
        width: 100%;
      }
    }
    .search-bar {
      margin-block-start: 10px;
    }
  }
  .results {
    padding: 10px 15px;
    .result-item:nth-child(1n+2) {
      margin-block-start: 12px;
    }
  }
}
</style>
