<template>
  <div class="admin_title_search">
    <div class="admin_title_addDelete">
      <h1>折扣碼管理</h1>
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
      <input type="text" class="search_input" placeholder="以折扣碼編號搜尋" />
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
          <th class="table_th_id">折扣碼ID</th>
          <th class="table_th_ell">標題</th>
          <th class="table_th_short">折扣碼</th>
          <th class="table_th_short">分類</th>
          <th class="table_th_short">狀態</th>
          <th class="table_th_short"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(code, idx) in codes">
          <td class="table_td_id">{{ code._id }}</td>
          <td class="table_td_ell">{{ code.title }}</td>
          <td class="table_th_short">{{ code.code }}</td>
          <td class="table_th_short">{{ code.category }}</td>
          <td class="table_th_short" :style="(code.sell) ? 'color:#52b96c;' : 'color:#e43939;'">{{ (code.sell) ? '上架' :
            '下架' }}</td>
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
        {{ form._id.length > 0 ? '編輯折扣碼' : '新增折扣碼' }}
        <div class="dialogClose" @click="dialogClose"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <!-- 內容 -->
      <div class="dialog_container">
        <div class="text_container">
          <div class="dialog_container_left">

            <div class="adminDialogBg_inputStyle">
              <label for="dialog_title">標題：</label>
              <div class="input_position">
                <input type="text" id="dialog_title" v-model="form.title" @blur="check('title')" />
                <p class="error_dialog" v-if="dialogchk_arr.title && rules.required(form.title) !== true">{{
                  rules.required(form.title) }}</p>
              </div>
            </div>

            <div class="adminDialogBg_inputStyle">
              <label for="dialog_subtitle">副標題：</label>
              <div class="input_position">
                <input type="text" id="dialog_subtitle" v-model="form.subtitle" @blur="check('subtitle')" />
                <p class="error_dialog" v-if="dialogchk_arr.subtitle && rules.required(form.subtitle) !== true">{{
                  rules.required(form.subtitle) }}</p>
              </div>
            </div>

            <div class="adminDialogBg_inputStyle">
              <label for="dialog_code">折扣碼：</label>
              <div class="input_position">
                <input type="text" id="dialog_code" v-model="form.code" @blur="check('code')" />
                <p class="error_dialog" v-if="dialogchk_arr.code && rules.required(form.code) !== true">{{
                  rules.required(form.code) }}</p>
              </div>
            </div>
            <div class="adminDialogBg_selectStyle">
              <label for="dialog_select_show">狀態：</label>
              <select id="dialog_select_show" v-model="form.show">
                <option value="true" selected>上架</option>
                <option value="false">下架</option>
              </select>
            </div>

            <div class="adminDialogBg_selectStyle">
              <label for="dialog_select_category">消息分類：</label>
              <select id="dialog_select_category" v-model="form.category">
                <option value="新品上市" selected>新品上市</option>
                <option value="活動消息">活動消息</option>
                <option value="媒體報導">媒體報導</option>
                <option value="店鋪資訊">店鋪資訊</option>
              </select>
            </div>

          </div>
          <div class="dialog_container_right">
            <div class="adminDialogBg_textareaStyle">
              <label for="dialog_description">內文：</label>
              <textarea id="dialog_description" rows="10" v-model="form.description"
                @blur="check('description')"></textarea>
            </div>
            <div class="adminDialogBg_image">
              <label>消息圖片：</label>
              <v-image-input v-model="form.image" :max-file-size="1" removable></v-image-input>
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
const codes = reactive([])
const valid = ref(false)
const form = reactive({
  _id: '',
  title: '',
  subtitle: '',
  code: '',
  description: '',
  image: undefined,
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
    form.title = ''
    form.subtitle = ''
    form.code = ''
    form.description = ''
    form.image = undefined
    form.show = false
    form.category = ''
    const valid = ref(false)
    form.idx = -1
  } else {
    form._id = codes[idx]._id
    form.title = codes[idx].title
    form.subtitle = codes[idx].subtitle
    form.code = codes[idx].code
    form.description = codes[idx].description
    form.image = codes[idx].image
    form.show = codes[idx].show
    form.category = codes[idx].category
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
  fd.append('title', form.title)
  fd.append('subtitle', form.subtitle)
  fd.append('code', form.code)
  fd.append('description', form.description)
  fd.append('image', form.image)
  fd.append('show', form.show)
  fd.append('category', form.category)
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/code', fd)
      codes.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
      dialogClose()
    } else {
      const { data } = await apiAuth.patch('/code/' + form._id, fd)
      codes[form.idx] = data.result
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
    const { data } = await apiAuth.get('/code/all')
    codes.push(...data.result)
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
