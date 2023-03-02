<template>
  <div class="admin_title_search">
    <div class="admin_title_addDelete">
      <h1>商品管理</h1>
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
      <input type="text" class="search_input" placeholder="以訂單編號搜尋" />
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
          <th class="table_th_id">商品ID</th>
          <th class="table_th_ell">名稱</th>
          <th class="table_th_ell">價格</th>
          <th class="table_th_short">分類</th>
          <th class="table_th_short">狀態</th>
          <th class="table_th_short"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in products">
          <td class="table_td_id">{{ product._id }}</td>
          <td class="table_td_ell">{{ product.name }}</td>
          <td class="table_td_ell">{{ price(product.mprice, product.lprice) }}</td>
          <td class="table_th_short">{{ product.category }}</td>
          <td class="table_th_short" :style="(product.sell) ? 'color:#52b96c;' : 'color:#e43939;'">
            {{ (product.sell) ? '上架' : '下架' }}</td>
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
        {{ form._id.length > 0 ? '編輯商品' : '新增商品' }}
        <div class="dialogClose" @click="dialogClose"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <!-- 內容 -->
      <div class="dialog_container">
        <div class="text_container">
          <div class="dialog_container_left">
          <div class="adminDialogBg_inputStyle">
            <label for="dialog_name">名稱：</label>
            <div class="input_position">
              <input type="text" id="dialog_name" v-model="form.name" @blur="check('name')" />
              <p class="error_dialog" v-if="dialogchk_arr.name && rules.required(form.name) !== true">{{
                rules.required(form.name) }}</p>
            </div>
          </div>

          <div class="adminDialogBg_checkbox">
            <label for="dialog_checkbox_label">客製化：</label>
            <label><input type="checkbox" v-model="form.custom.lsize">大杯</label>
            <label><input type="checkbox" v-model="form.custom.msize">中杯</label>
            <label><input type="checkbox" v-model="form.custom.ice">冰</label>
            <label><input type="checkbox" v-model="form.custom.hot">熱</label>
            <label><input type="checkbox" v-model="form.custom.sugar">全糖</label>
            <label><input type="checkbox" v-model="form.custom.nosugar">無糖</label>
          </div>

          <div v-if="form.custom.lsize" class="adminDialogBg_inputStyle">
            <label for="dialog_price">大杯價格：</label>
            <div class="input_position">
              <input type="number" id="dialog_price" v-model="form.lprice" @blur="check('price')" />
              <p class="error_dialog" v-if="dialogchk_arr.price && rules.required(form.lprice) !== true">{{
                rules.required(form.lprice) }}</p>
              <p class="error_dialog2" v-if="dialogchk_arr.price && rules.price(form.lprice) !== true">{{
                rules.price(form.lprice) }}</p>
            </div>
          </div>

          <div v-if="form.custom.msize" class="adminDialogBg_inputStyle">
            <label for="dialog_price">中杯價格：</label>
            <div class="input_position">
              <input type="number" id="dialog_price" v-model="form.mprice" @blur="check('price')" />
              <p class="error_dialog" v-if="dialogchk_arr.price && rules.required(form.mprice) !== true">{{
                rules.required(form.mprice) }}</p>
              <p class="error_dialog2" v-if="dialogchk_arr.price && rules.price(form.mprice) !== true">{{
                rules.price(form.mprice) }}</p>
            </div>
          </div>

          <div class="adminDialogBg_selectStyle">
            <label for="dialog_select_sell">狀態：</label>
            <select id="dialog_select_sell" v-model="form.sell">
              <option value="true" selected>上架</option>
              <option value="false">下架</option>
            </select>
          </div>

          <div class="adminDialogBg_selectStyle">
            <label for="dialog_select_category">商品分類：</label>
            <select id="dialog_select_category" v-model="form.category">
              <option value="latte" selected>拿鐵咖啡</option>
              <option value="espresso">義式咖啡</option>
              <option value="tea">萃茶</option>
              <option value="special">期間限定</option>
            </select>
          </div>

        </div>
        <div class="dialog_container_right">
          <div class="adminDialogBg_textareaStyle">
            <label for="dialog_description">說明：</label>
            <textarea id="dialog_description" rows="10" v-model="form.description"
              @blur="check('description')"></textarea>
          </div>

          <div class="adminDialogBg_image">
          <label>商品圖片：</label>
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
import { apiAuth } from '../../plugins/axios'
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import { UNREF } from '@vue/compiler-core';

const price = (m, l) => {

  if (m === 0 && l !== 0) {
    return "<L> " + l
  } else if (m === 0 && l === 0) {
    return " "
  } else if (m !== 0 && l === 0) {
    return "<M>" + m
  } else {
    return "<M>" + m + "  <L>" + l
  }
}

const rules = {
  required(value) {
    return !!value || '欄位必填'
  },
  price(value) {
    return value > 0 || '價格錯誤'
  }
}
const products = reactive([])
const valid = ref(false)
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

const dialogchk_arr = reactive({
  name: '',
  description: '',
  price: ''
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
    form.name = ''
    form.mprice = 0
    form.lprice = 0
    form.description = ''
    form.image = undefined
    form.sell = false
    form.category = ''
    const valid = ref(false)
    form.idx = -1
    form.custom = {
      msize: false,
      lsize: false,
      ice: false,
      hot: false,
      sugar: false,
      nosugar: false
    }
  } else {
    form._id = products[idx]._id
    form.name = products[idx].name
    form.mprice = products[idx].mprice
    form.lprice = products[idx].lprice
    form.description = products[idx].description
    form.image = products[idx].image
    form.sell = products[idx].sell
    form.category = products[idx].category
    const valid = ref(false)
    form.idx = idx
    form.custom = (products[idx].custom) ? JSON.parse(products[idx].custom) : {
      msize: false,
      lsize: false,
      ice: false,
      hot: false,
      sugar: false,
      nosugar: false
    }
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
  if (!form.custom.msize) form.mprice = 0
  if (!form.custom.lsize) form.lprice = 0

  fd.append('name', form.name)
  fd.append('lprice', form.lprice)
  fd.append('mprice', form.mprice)
  fd.append('description', form.description)
  fd.append('image', form.image)
  fd.append('sell', form.sell)
  fd.append('category', form.category)
  fd.append('custom', JSON.stringify(form.custom))
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/products', fd)
      products.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
      dialogClose()
    } else {
      const { data } = await apiAuth.patch('/products/' + form._id, fd)
      products[form.idx] = data.result
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
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
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
