<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet" />
  <!-- nav&social ------------------------------------------------------->
  <div id="nav_fixed" style="z-index: 3000">
    <div id="nav_container">
      <div id="nav_logo">
        <router-link to="/"><img src="../images/header_logo.png"></router-link>
        
      </div>
      <div id="nav_icon">
        <ul>
          <li v-if="isLogin" @click="cart_in">
            <a href="" @click.prevent>
              <i class="fa-solid fa-cart-shopping"></i>
              <div class="cart_numberbg">{{ cart }}</div>
            </a>
          </li>
          <li>
            <router-link :to="isLogin ? '/account' : '/register'"><i class="fa-solid fa-circle-user"
                :style="isLogin ? 'color:#fc9f4d' : ''"></i></router-link>
          </li>
          <li v-if="isAdmin">
            <router-link to="/admin"><i class="fa-solid fa-screwdriver-wrench"></i></router-link>
          </li>
          <li v-if="isLogin" @click="logout">
            <a href="" @click.prevent><i class="fa-solid fa-right-from-bracket"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="hamburger">
      <div class="hamburger_btn">
        <div class="hamburger_btn_box">
          <div class="hamburger_btn_line humLine_1"></div>
          <div class="hamburger_btn_line humLine_2"></div>
          <div class="hamburger_btn_line humLine_3"></div>
        </div>
      </div>

      <ul class="hum_list">
        <li class="hum_item"><router-link to="/" class="hum_link" @click="chgPage">首頁</router-link></li>
        <li class="hum_item"><router-link to="/aboutus" class="hum_link">關於我們</router-link></li>
        <li class="hum_item"><router-link to="/news" class="hum_link">最新消息</router-link></li>
        <!-- <li class="hum_item"><router-link to="/introduce" class="hum_link">菜單介紹</router-link></li> -->
        <li class="hum_item"><router-link to="/products" class="hum_link">外送訂餐</router-link></li>
        <li class="hum_item"><router-link to="/qa" class="hum_link">常見問題</router-link></li>
        <li class="hum_item"><router-link to="/contant" class="hum_link">聯絡我們</router-link></li>
      </ul>
    </div>
  </div>
  <div id="social_icon" style="z-index: 3000">
    <ul>
      <li>
        <a href="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
      </li>
      <li>
        <a href="https://twitter.com/?lang=zh-Hant" target="_blank"><i class="fa-brands fa-twitter"></i></a>
      </li>
      <li>
        <a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
      </li>
    </ul>
  </div>

  <!-- 購物車 ------------------------------------------------------------>
  <div v-if="showcart" class="cart_darkbg" @click="cart_out"></div>
  <div v-if="showcart" class="cart_container">
    <div class="cart_title">
      購物車
      <i class="fa-solid fa-xmark" @click="cart_out"></i>
    </div>
    <div class="cart_allproducts_container">
      <div class="cart_product_container" v-for="(product, idx) in allcart" :key="product._id">
        <div class="cart_product_container_left"> <img :src="product.p_id.image"></div>
        <div class="cart_product_container_right">
          <div class="cart_product_title_delete">
            {{ product.p_id.name }}
            <i class="fa-solid fa-trash-can" @click="updateCart(idx, product.quantity * -1)"></i>
          </div>
          <div class="cart_product_allcustom">
            <span v-if="JSON.parse(product.custom).size == 'M'">-中杯</span>
            <span v-if="JSON.parse(product.custom).size == 'L'">-大杯</span>
            <span v-if="JSON.parse(product.custom).ice == 'ice'">-冰</span>
            <span v-if="JSON.parse(product.custom).ice == 'hot'">-熱</span>
            <span v-if="JSON.parse(product.custom).sugar == 'sugar'">-全糖</span>
            <span v-if="JSON.parse(product.custom).sugar == 'nosugar'">-無糖</span>
          </div>
          <div class="cart_controllnum_titleprice">
            <div class="cart_controllnum">
              <div class="cart_controllbtn" @click="updateCart(idx, -1)"><i class="fa-solid fa-minus"></i></div>
              <input type="number" v-model="product.quantity">
              <div class="cart_controllbtn" @click="updateCart(idx, 1)"><i class="fa-solid fa-plus"></i></div>
            </div>
            <span v-if="JSON.parse(product.custom).size == 'L'">${{ product.quantity * product.p_id.lprice }}</span>
            <span v-if="JSON.parse(product.custom).size == 'M'">${{ product.quantity * product.p_id.mprice }}</span>
          </div>
        </div>

      </div>
    </div>
    <div class="cart_checkout_container">
      <div class="titleprice">
        <span>總金額</span>
        <span>${{ totalPrice }}</span>
      </div>
      <router-link to="/checkout">前往結帳</router-link>
    </div>
  </div>

  <!-- 背景紙張 -->
  <div class="background_main"></div>
</template>
<script setup>
import { apiAuth } from '../plugins/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import { onMounted, ref, reactive, computed } from 'vue'
import { initMenu } from '../js/nav.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const user = useUserStore()
const router = useRouter()

const { isLogin, isAdmin, cart, token } = storeToRefs(user)
const { logout, editCart, checkout } = user

const showcart = ref(false)
onMounted(() => {
  initMenu()
})

function chgPage() {
  // console.log(router)
}

const cart_in = () => {
  showcart.value = true
  getcart()
}

const cart_out = () => {
  showcart.value = false
}

const allcart = reactive([])

const updateCart = async (idx, quantity) => {
  await editCart({ _id: allcart[idx].p_id._id, quantity, custom: allcart[idx].custom, showPu: false })
  allcart[idx].quantity += quantity
  if (allcart[idx].quantity <= 0) {
    allcart.splice(idx, 1)
  }
}

const totalPrice = computed(() => {
  return allcart.reduce((total, current) => {
    if (JSON.parse(current.custom).size == 'L') {
      return total + (current.p_id.lprice * current.quantity)
    } else {
      return total + (current.p_id.mprice * current.quantity)
    }

  }, 0)
})

const onCheckoutBtnClick = async () => {
  await checkout()
  router.push('/orders')
}


const canCheckout = computed(() => {
  return allcart.length > 0 && !allcart.some(product => {
    return !product.p_id.sell
  })
});

// 呼叫購物車資料
const getcart = async () => {
  if (token.value.length > 0) {
    try {
      allcart.length = 0
      const { data } = await apiAuth.get('/users/cart')
      allcart.push(...data.result)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: '取得購物車失敗'
      })
    }
  }

}

getcart()

</script>
<style lang="sass">
.swal2-container
  z-index: 5000
</style>
