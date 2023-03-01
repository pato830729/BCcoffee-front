<template>
  <NavMenu></NavMenu>
  <!-- bact to top ------------------------------------------------------->
  <a @click='back' class="float_circle backtotop" style="text-decoration: none">
    <span>回上一頁</span>
    <i class="fa-solid fa-reply"></i>
  </a>
  <!-- 內容 -------------------------------------------------------------->
  <div id="container">
    <div class="pageTitle">
      <span>NEWS RELEASE</span>
      <h1>{{ news.category }}</h1>
    </div>
    <div class="news_info_container">
      <div class="info_img">
        <img :src="news.image" />
      </div>
      <h1>{{ news.title }}</h1>
      <p>
        {{ news.description }}
      </p>
      <!-- <div class="allimg_box">
        <div class="imgouter">
          <div class="imginner"></div>
        </div>
        <div class="imgouter">
          <div class="imginner"></div>
        </div>
        <div class="imgouter">
          <div class="imginner"></div>
        </div>
        <div class="imgouter">
          <div class="imginner"></div>
        </div>
        <div class="imgouter">
          <div class="imginner"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import NavMenu from '@/components/NavMenu.vue'
import FloatCircle from '@/components/FloatCircle.vue'
import { reactive } from 'vue'
import { api } from '@/plugins/axios'
import { useRoute } from 'vue-router'
import { Swal } from 'sweetalert2'
import router from '../../plugins/router'

const back = () => {
    history.back()
}
const route = useRoute()
const news = reactive({
  _id: '',
  title: '',
  description: '',
  image: '',
  sell: true,
  category: ''
})

;(async () => {
  try {
    const { data } = await api.get('/news/' + route.params.id)
    news._id = data.result._id
    news.title = data.result.title
    news.description = data.result.description
    news.image = data.result.image
    news.sell = data.result.sell
    news.category = data.result.category

    document.title = '購物網 | ' + news.title
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
    router.go(-1)
  }
})()
</script>
