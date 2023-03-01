<template>
  <div class="admin_title_search">
    <div class="admin_title_addDelete">
      <h1>Q&A管理</h1>
      <button class="admin_button button_add" @click="openDialog(-1)">
        <i class="fa-solid fa-circle-plus"></i>
        新增
      </button>
      <!-- <button class="admin_button button_delete">
            <i class="fa-regular fa-trash-can"></i>
            刪除
          </button> -->
    </div>

    <div class="search_container">
      <input type="text" class="search_input" placeholder="以Q&A編號搜尋" />
      <button class="admin_button button_search">
        <i class="fa-solid fa-magnifying-glass"></i>
        搜尋
      </button>
    </div>
  </div>
  <div class="admin_table">
    <table>
      <thead>
        <tr>
          <th class="table_th_id">Q&A ID</th>
          <th class="table_th_ell">問題</th>
          <th class="table_th_ell">回答</th>
          <th class="table_th_short">分類</th>
          <th class="table_th_short">狀態</th>
          <th class="table_th_short"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(qa, idx) in qas">
          <td class="table_td_id">{{ qa._id }}</td>
          <td class="table_td_ell">{{ qa.question }}</td>
          <td class="table_td_ell">{{ qa.answer }}</td>
          <td class="table_th_short">{{ qa.category }}</td>
          <td class="table_th_short" :style="(qa.show) ? 'color:#52b96c;' : 'color:#e43939;'">{{ (qa.show) ? '上架' : '下架'
          }}</td>
          <td class="table_th_short"><button class="admin_button button_controll" @click="openDialog(idx)"><i
                class="fa-solid fa-pen"></i>修改</button></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 商品視窗 -->
  <div class="dialogBg">
    <form ref="valid" @submit.prevent="submit">
      <!-- 標題 -->
      <div class="dialogTitle">
        {{ form._id.length > 0 ? '編輯Q&A' : '新增Q&A' }}
        <div class="dialogClose" @click="dialogClose"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <!-- 內容 -->
      <div class="dialog_container">
        <div class="text_container">
          <div class="dialog_container_left">
            <div class="adminDialogBg_textareaStyle">
              <label for="dialog_question">問題：</label>
              <textarea id="dialog_question" rows="10" v-model="form.question" @blur="check('question')"></textarea>
            </div>

            <div class="adminDialogBg_textareaStyle">
              <label for="dialog_answer">回答：</label>
              <textarea id="dialog_answer" rows="10" v-model="form.answer" @blur="check('answer')"></textarea>
            </div>

          </div>
          <div class="dialog_container_right">
            <div class="adminDialogBg_selectStyle">
              <label for="dialog_select_show">狀態：</label>
              <select id="dialog_select_show" v-model="form.show">
                <option value="true" selected>上架</option>
                <option value="false">下架</option>
              </select>
            </div>

            <div class="adminDialogBg_selectStyle">
              <label for="dialog_select_category">問題分類：</label>
              <select id="dialog_select_category" v-model="form.category">
                <option value="交易相關問題" selected>交易相關問題</option>
                <option value="食材相關問題">食材相關問題</option>
                <option value="運輸相關問題">運輸相關問題</option>
              </select>
            </div>




          </div>
        </div>





        <div class="dialog_btn_container">
          <button class="admin_button button_close" @click="dialogClose">取消</button>
          <button class="admin_button button_save" type="submit">儲存</button>
        </div>
      </div>
    </form>
  </div>
  <div class="darkDialogBg" @click="dialogClose"></div>
</template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'

const rules = {
  required(value) {
    return !!value || '欄位必填'
  }
}
const qas = reactive([])
const valid = ref(false)
const form = reactive({
  _id: '',
  question: '',
  answer: '',
  show: false,
  category: '',
  idx: -1
})

const dialogchk_arr = reactive({
  name: '',
  description: '',
})

function check(type) {
  dialogchk_arr[type] = true
}

const dialogClose = () => {
  const darkDialogBg = document.querySelector('.darkDialogBg')
  const dialogBg = document.querySelector('.dialogBg')
  darkDialogBg.style.display = 'none'
  dialogBg.style.display = 'none'
}

const openDialog = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.question = ''
    form.answer = ''
    form.show = false
    form.category = ''
    const valid = ref(false)
    form.idx = -1
  } else {
    form._id = qas[idx]._id
    form.question = qas[idx].question
    form.answer = qas[idx].answer
    form.show = qas[idx].show
    form.category = qas[idx].category
    const valid = ref(false)
    form.idx = idx
  }
  for (const key in dialogchk_arr) {
    dialogchk_arr[key] = false
  }
  const darkDialogBg = document.querySelector('.darkDialogBg')
  const dialogBg = document.querySelector('.dialogBg')
  darkDialogBg.style.display = 'block'
  dialogBg.style.display = 'block'
}

const submit = async () => {
  if (!valid.value) return
  const fd = new FormData()
  fd.append('question', form.question)
  fd.append('answer', form.answer)
  fd.append('show', form.show)
  fd.append('category', form.category)
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/qa', fd)
      qas.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
      dialogClose()
    } else {
      const { data } = await apiAuth.patch('/qa/' + form._id, fd)
      qas[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
      dialogClose()
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
}
(async () => {
  try {
    const { data } = await apiAuth.get('/qa/all')
    qas.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()
</script>

<style lang="sass">
$v-image-input-width: 100px !default
$v-image-input-height: 100px !default
@import 'vue3-img-input/src/styles/style.scss'
.swal2-container
  z-index: 2500
</style>
