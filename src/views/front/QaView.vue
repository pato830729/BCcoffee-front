<template>
  <NavMenu></NavMenu>
  <!-- bact to top ------------------------------------------------------->
  <router-link to="/contant" class="float_circle backtotop" style="text-decoration: none;">
    <span>聯絡我們</span>
    <i class="fa-solid fa-envelope"></i>
  </router-link>


  <div id="container">
    <div class="pageTitle">
      <span>Q&A</span>
      <h1>常見問題</h1>
    </div>

    <div id="sort">
      <ul class="sort_box">
        <li class="sort_item" @click="switchQas('交易相關問題')">交易相關問題</li>
        <li class="sort_item" @click="switchQas('食材相關問題')">食材相關問題</li>
        <li class="sort_item" @click="switchQas('運輸相關問題')">運輸相關問題</li>
      </ul>
      <div class="sort_linebox">
        <div class="sort_lineFocus"></div>
        <div class="sort_line"></div>
      </div>
    </div>

    <div id="qa_container">
      <ul class="list_container">
        <li class="qa_list" v-for="(qa, idx) in qas" :key="qa._id">
          <Qalist v-bind="qa"></Qalist>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import NavMenu from '@/components/NavMenu.vue'
import Qalist from '@/components/Qalist.vue'
import { onMounted } from 'vue'
import { api } from '@/plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'

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

const qas = reactive([]);
const qasAll = reactive([]);

const switchQas = type => {
  qas.length = 0
  for (const key in qasAll) {
    if (type == qasAll[key].category || type == 'All') {
      qas.push(qasAll[key])
    }
  }
}

(async () => {
  try {
    const { data } = await api.get('/qa')
    qasAll.push(...Array.from(data.result).reverse())
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }

  switchQas('交易相關問題')
})()
</script>
