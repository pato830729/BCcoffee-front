<template>
  <NavMenu></NavMenu>

  <!-- 內容 -------------------------------------------------------------->
  <div id="container">
    <div class="pageTitle">
      <span>ORDER</span>
      <h1>外送餐點</h1>
    </div>
    <div id="sort">
      <ul class="sort_box">
        <li class="sort_item" @click="switchproducts('latte')">拿鐵咖啡 Latte</li>
        <li class="sort_item" @click="switchproducts('espresso')">義式咖啡 Espresso</li>
        <li class="sort_item" @click="switchproducts('tea')">萃茶 Tea</li>
        <li class="sort_item" @click="switchproducts('special')">期間限定 Special</li>
      </ul>
      <div class="sort_linebox">
        <div class="sort_lineFocus"></div>
        <div class="sort_line"></div>
      </div>
    </div>

    <!-- 點餐卡片盒 --------------------------------------------------->
    <div id="ordercard_container">
      <div class="ordercard" v-for="(product, idx) in products">
        <div class="cardimg_bg">
          <div class="cardimg"><img :src="product.image" /></div>
        </div>
        <div class="card_textbox">
          <div class="card_textbox_display">
            <h2>{{ product.name }}</h2>
            <i v-if="!JSON.parse(product.custom).hot" class="fa-regular fa-snowflake"></i>
            <i v-if="!JSON.parse(product.custom).ice" class="fa-solid fa-mug-hot"></i>
          </div>

          <span v-if="product.mprice !== 0" class="ordercard_size">M</span>
          <span v-if="product.mprice !== 0" class="ordercard_prize">${{ product.mprice }}</span>
          <span v-if="product.lprice !== 0" class="ordercard_size">L</span>
          <span v-if="product.lprice !== 0" class="ordercard_prize">${{ product.lprice }}</span>
        </div>
        <div class="card_btn" @click="open(idx)">加入購物車</div>
      </div>
    </div>

    <!-- 跳轉彈窗 ----------------------------------------------------->
    <div class="order_blackbg" v-if="show === true" @click="out"></div>
    <div class="order_infocard" v-if="show === true">
      <div class="ordercard_unsale" v-if="!product.sell">此商品已下架</div>
      <div class="product_info_container">
        <div class="product_info_img">
          <img :src="product.image">
        </div>
        <div class="product_info_text">
          <div class="product_info_out">
            <div class="name_prize">
              <h2>{{ product.name }}</h2>
              <span v-if="product.custom.msize" class="ordercard_size">M</span>
              <span v-if="product.custom.msize" class="ordercard_prize">${{ product.mprice }}</span>
              <span v-if="product.custom.lsize" class="ordercard_size">L</span>
              <span v-if="product.custom.lsize" class="ordercard_prize">${{ product.lprice }}</span>
            </div>
            <div class="card_out" @click="out">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div class="describe_info">
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
      <div class="product_info_line"></div>
      <form ref="valid" @submit.prevent="submitCart">
        <div class="choose_container">
          <div class="choose_box">
            <h3>尺寸選擇</h3>
            <div v-if="product.custom.msize" class="options01">
              <input type="radio" id="size_m" name="size_choose" class="text_radio" value="M" v-model="chooseCustom.size" />
              <label for="size_m">
                <span></span>
                中杯
              </label>
            </div>
            <div v-if="product.custom.lsize" class="options02">
              <input type="radio" id="size_l" name="size_choose" class="text_radio" value="L" v-model="chooseCustom.size" />
              <label for="size_l">
                <span></span>
                大杯
              </label>
            </div>
          </div>
          <div class="product_info_line"></div>
          <div class="choose_box">
            <h3>冰熱選擇</h3>
            <div v-if="product.custom.ice" class="options01">
              <input type="radio" id="ice_cold" name="cold_choose" class="text_radio" value="ice" v-model="chooseCustom.ice" />
              <label for="ice_cold">
                <span></span>
                冰
              </label>
            </div>
            <div v-if="product.custom.hot" class="options02">
              <input type="radio" id="ice_hot" name="cold_choose" class="text_radio" value="hot" v-model="chooseCustom.ice" />
              <label for="ice_hot">
                <span></span>
                熱
              </label>
            </div>
          </div>
          <div class="product_info_line"></div>
          <div class="choose_box">
            <h3>甜度選擇</h3>
            <div v-if="product.custom.sugar" class="options01">
              <input type="radio" id="sugar_sugar" name="sugar_choose" class="text_radio" value="sugar" v-model="chooseCustom.sugar" />
              <label for="sugar_sugar">
                <span></span>
                全糖
              </label>
            </div>
            <div v-if="product.custom.nosugar" class="options02">
              <input type="radio" id="sugar_nosugar" name="sugar_choose" class="text_radio" value="nosugar" v-model="chooseCustom.sugar" />
              <label for="sugar_nosugar">
                <span></span>
                無糖
              </label>
            </div>
          </div>
        </div>
        <div class="product_info_line"></div>
        <div class="amountbtn_container">
          <div class="amount_container">
            <div class="amount_btn amount_minus" @click="add(-1)"><i class="fa-solid fa-minus"></i></div>
            <input type="number" placeholder="0" v-model.number="quantity">
            <div class="amount_btn amount_plus" @click="add(1)"><i class="fa-solid fa-plus"></i></div>
          </div>
          <button class="addproduct_btn" type="submit">加入購物車</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import NavMenu from '../../components/NavMenu.vue'
import { api } from '../../plugins/axios'
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import { onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const add = (value) => {
  quantity.value += value;
}

const user = useUserStore()
const { editCart } = user

const valid = ref(false)
const quantity = ref(0)
const chooseCustom = reactive({
  size: "",
  ice: "",
  sugar: ""
})

const form = reactive({
  _id: '',
  name: '',
  mprice: 0,
  lprice: 0,
  description: '',
  image: undefined,
  sell: false,
  category: '',
  idx: -1,
  custom: {
    msize: false,
    lsize: false,
    ice: false,
    hot: false,
    sugar: false,
    nosugar: false
  }
})

const submitCart = () => {
  if (!valid.value) return
  editCart({ _id: product._id, quantity: quantity.value ,custom:JSON.stringify(chooseCustom), showPu:true})
  out()
}

const product = reactive({
  _id: '',
  name: '',
  mprice: 0,
  lprice: 0,
  description: '',
  image: '',
  sell: false,
  category: '',
  idx: -1,
  custom: {
    msize: false,
    lsize: false,
    ice: false,
    hot: false,
    sugar: false,
    nosugar: false
  }
})

const show = ref(false)
const open = idx => {
  show.value = true
  product._id = products[idx]._id
  product.name = products[idx].name
  product.mprice = products[idx].mprice
  product.lprice = products[idx].lprice
  product.description = products[idx].description
  product.image = products[idx].image
  product.sell = products[idx].sell
  product.category = products[idx].category
  product.idx = idx
  product.custom = products[idx].custom
    ? JSON.parse(products[idx].custom)
    : {
      msize: false,
      lsize: false,
      ice: false,
      hot: false,
      sugar: false,
      nosugar: false
    }
  quantity.value = 0

  if(product.custom.msize)chooseCustom.size="M"
  else chooseCustom.size="L"
  if(product.custom.ice)chooseCustom.ice="ice"
  else chooseCustom.ice="hot"
  if(product.custom.sugar)chooseCustom.sugar="sugar"
  else chooseCustom.sugar="nosugar"  
}

const out = () => {
  show.value = false
}

onMounted(() => {
  // 抓取每分類的寬度
  const sortitems = document.querySelectorAll('.sort_item')
  const sortlineFocus = document.querySelector('.sort_lineFocus')
  const sortwidth = 100 / sortitems.length

  for (let i = 0; i < sortitems.length; i++) {
    sortitems[0].style.color = '#fc9f4d'
    sortitems[i].style.width = `${sortwidth}%`
    sortitems[i].addEventListener('click', () => {
      sortlineFocus.style.transition = 'all .5s ease'
      sortlineFocus.style.left = `${sortwidth * i}%`
      sortitems[i].style.color = '#fc9f4d'
      const siblings = Array.from(sortitems).filter(c => c !== sortitems[i])
      for (let j = 0; j < siblings.length; j++) {
        siblings[j].style.color = '#a35e47'
      }
    })
  }
  sortlineFocus.style.width = `${sortwidth}%`
})

const products = reactive([])
const productsAll = reactive([])

const switchproducts = type => {
  products.length = 0
  for (const key in productsAll) {
    if (type == productsAll[key].category || type == 'All') {
      products.push(productsAll[key])
    }
  }
}

  ; (async () => {
    try {
      const { data } = await api.get('/products')
      productsAll.push(...Array.from(data.result))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }

    switchproducts('latte')
  })()
</script>
