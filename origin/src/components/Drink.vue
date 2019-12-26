<template>
  <div class="drink col-flex-container">
    <span class="drink-name">{{drink.drinkName}}</span>
    <span class="brand">来自{{drink.brand.brandName}}</span>
  </div>
</template>

<script>
export default {
  name: 'Drink',
  props: {
    drink: Object
  }
}
</script>

<style scoped lang="less">
.drink {
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  .drink-name {
    font-size: 20px;
    font-weight: bold;
  }
  .brand {
    font-size: 16px;
    color: #666;
  }
}
</style>
