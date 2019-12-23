<template>
  <div id="create-poster-page" class="col-flex-container main-axis-center">
  <div class="row-flex-container brand-shop-wrapper">
    <el-select v-model="chosenBrand" filterable allow-create default-first-option
               placeholder="请选择或输入品牌" @change="onBrandChange" class="select">
      <el-option v-for="brand in brands" :key="brand.brandId"
                 :label="brand.brandName" :value="brand.brandId"/>
    </el-select>
    <el-select v-model="chosenShop" filterable allow-create default-first-option
               placeholder="请选择或输入分店" class="select">
      <el-option v-for="(shop, index) in shops" :key="index"
                 :label="shop.shopName" :value="shop.shopName"/>
    </el-select>
  </div>
  <el-input v-model="content" type="textarea" autosize placeholder="请输入你的评价" class="content-input"/>
  <el-select v-model="chosenDrinks" filterable allow-create multiple default-first-option
             placeholder="请选择你要评价的饮品" class="drink-select">
    <el-option v-for="drink in drinks" :key="drink.drinkId"
               :label="drink.drinkName" :value="drink.drinkId"/>
  </el-select>
  <div class="images row-flex-container">
    <div class="item-wrapper" v-for="image in images" :key="image" @click="removeImage(image)">
      <el-image fit="cover" :src="image" class="item image"/>
    </div>
    <div class="item-wrapper "
         v-if="images.length < 9" @click="addImage">
      <div class="item row-flex-container main-axis-center second-axis-center">
        <i class="el-icon-plus"/>
      </div>
    </div>
  </div>
  <div class="float-btn col-flex-container main-axis-center second-axis-center">提 交 点 评</div>
</div>
</template>

<script>
export default {
  name: 'CreatePoster',
  data () {
    return {
      brands: [],
      shops: [],
      drinks: [],
      chosenBrand: '',
      chosenShop: '',
      content: '',
      chosenDrinks: [],
      images: []
    }
  },
  mounted () {
    this.$emit('setHeader', true, '添加点评')
    this.$api.getAllBrands()
      .then(res => {
        this.brands = res.data.data
      })
  },
  methods: {
    onBrandChange () {
      if (typeof this.chosenBrand === 'string') return
      this.$api.getBrandShops(this.chosenBrand)
        .then(res => {
          if (res.data.code === this.$apiError.ID_NOT_FOUND) {
            this.$message.error('网络错误！')
            Promise.reject(new Error('ID not found!'))
          }
          this.shops = res.data.data
          return this.$api.getBrandDrinks(this.chosenBrand)
        })
        .then(res => {
          this.drinks = res.data.data
        })
    },
    removeImage (image) {
      console.log(image)
      this.images.splice(this.images.indexOf(image), 1)
    },
    addImage () {
      this.$cordova.imagePicker.hasReadPermission()
        .then(couldRead => {
          if (couldRead) {
            return this.$cordova.imagePicker.getPictures(
              { maximumImagesCount: 9 - this.images.length })
          } else {
            this.$cordova.imagePicker.requestReadPermission()
            return []
          }
        })
        .then(images => {
          this.images.push(...images)
        })
    },
    submit () {
      this.$api.createPoster(this.content, this.drinks, this.images, this.chosenBrand)
    }
  }
}
</script>

<style lang="less">
@import url('../assets/style/globalVals');
#create-poster-page {
  min-height: calc(100vh - @navigation-bar-display-height - 32px);
  background-color: @primary-color-lighter;
  padding: 16px;
  .brand-shop-wrapper {
    .select:first-child {
      margin-inline-end: 10px;
    }
    margin-block-end: 10px;
  }
  .content-input {
    margin-block-end: 10px;
  }
  .drink-select {
    width: 100%;
    margin-block-end: 10px;
  }
  .images {
    width: 100%;
    flex-wrap: wrap;
    align-content: center;
    .item-wrapper {
      @size: calc((100vw - 32px - 60px) / 3);
      width: @size;
      height: @size;
      padding: 10px;
      flex-wrap: wrap;
      &.add {
        border-radius: 4px;
        border: 2px #aaa dashed;
      }
      .item {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 2px #aaa dashed;
      }
    }
  }
  .float-btn {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    height: 40px;
    background-color: @primary-color;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border-radius: 20px;
  }
}
</style>
