<template>
  <NavMenu></NavMenu>
  <FloatCircle></FloatCircle>
  <!-- 內容 -------------------------------------------------------------->
  <div id="container">
    <div class="pageTitle">
      <span>NEWS RELEASE</span>
      <h1>最新消息</h1>
    </div>
    <div id="sort">
      <ul class="sort_box">
        <li class="sort_item" @click="switchNews('All')">所有消息</li>
        <li class="sort_item" @click="switchNews('新品上市')">新品上市</li>
        <li class="sort_item" @click="switchNews('活動消息')">活動消息</li>
        <li class="sort_item" @click="switchNews('媒體報導')">媒體報導</li>
        <li class="sort_item" @click="switchNews('店鋪資訊')">店鋪資訊</li>
      </ul>
      <div class="sort_linebox">
        <div class="sort_lineFocus"></div>
        <div class="sort_line"></div>
      </div>
    </div>
    <div id="news_cardBox">
      <div class="news_card" v-for="(news, idx) in news" :key="news._id">
        <NewsCard v-bind="news"></NewsCard>
      </div>
    </div>
    <!-- <div class="addnewsbtn_position">
      <div class="addnewsbtn">更多消息</div>
    </div> -->
  </div>
</template>
<script setup>
import { api } from '@/plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import NavMenu from '@/components/NavMenu.vue'
import FloatCircle from '@/components/FloatCircle.vue'
import NewsCard from '@/components/NewsCard.vue'
import { onMounted } from 'vue'

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

  const backtotop = document.querySelector('.backtotop')
  backtotop.addEventListener('click', () => {
    window.scrollTo(0, 0)
  })
})



const news = reactive([]);
const newsAll = reactive([]);

const switchNews = (type) => {
  news.length = 0
  for (const key in newsAll) {
    if(type == newsAll[key].category || type == "All") {
      news.push(newsAll[key])
    }
  }
}

(async () => {
  try {
    const { data } = await api.get('/news')
    newsAll.push(...Array.from(data.result).reverse())
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }

  switchNews("All")
})()
</script>
