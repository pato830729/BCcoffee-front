<template>
  <div class="product_info_container">
    <div class="product_info_img"></div>
    <div class="product_info_text">
      <div class="product_info_out">
        <div class="name_prize">
          <h2>{{name}}</h2>
          <span class="ordercard_size">M</span>
          <span class="ordercard_prize">${{price}}</span>
          <span class="ordercard_size">L</span>
          <span class="ordercard_prize">${{price}}</span>
        </div>
        <div class="card_out">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div class="describe_info">
        <p>{{description}}</p>
      </div>
    </div>
  </div>
  <div class="product_info_line"></div>
  <div class="choose_container">
    <div class="choose_box">
      <h3>尺寸選擇</h3>
      <div class="options01">
        <input type="radio" id="size_m" name="size_choose" class="text_radio">
        <label for="size_m"><span></span>中杯</label>
      </div>
      <div class="options02">
        <input type="radio" id="size_l" name="size_choose" class="text_radio">
        <label for="size_l"><span></span>大杯</label>
      </div>
    </div>
    <div class="product_info_line"></div>
    <div class="choose_box">
      <h3>冰熱選擇</h3>
      <div class="options01">
        <input type="radio" id="ice_cold" name="cold_choose" class="text_radio">
        <label for="ice_cold"><span></span>冰</label>
      </div>
      <div class="options02">
        <input type="radio" id="ice_hot" name="cold_choose" class="text_radio">
        <label for="ice_hot"><span></span>熱</label>
      </div>
    </div>
  </div>
  <div class="product_info_line"></div>
  <div class="amountbtn_container">
    <div class="amount_container">
      <div class="amount_btn amount_minus"><i class="fa-solid fa-minus"></i></div>
      <input type="text" placeholder="0">
      <div class="amount_btn amount_plus"><i class="fa-solid fa-plus"></i></div>
    </div>
    <div class="addproduct_btn">加入購物車</div>
  </div>
</template>

<script setup>
defineProps({
  _id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  }
})

</script>