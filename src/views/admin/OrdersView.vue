<template>
  <div class="admin_title_search">
    <div class="admin_title_addDelete">
      <h1>訂單管理</h1>
      <!-- <button class="admin_button button_add" @click="openDialog(-1)">
        <i class="fa-solid fa-circle-plus"></i>
        新增
      </button> -->
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
          <th class="table_th_id">訂單ID</th>
          <th class="table_th_ell">日期</th>
          <th class="table_th_ell">會員帳號</th>
          <th class="table_th_ell">金額</th>
          <th class="table_th_ell">付款方式</th>
          <th class="table_th_short"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, idx) in orders" :key="order._id">
          <td class="table_td_id">{{ order._id }}</td>
          <td class="table_td_ell">{{ new Date(order.date).toLocaleDateString() }}</td>
          <td class="table_td_ell">{{ order.u_id.account }}</td>
          <td class="table_td_ell">{{ order.totalPrice }}</td>
          <td class="table_td_ell">{{ (order.payway == 'cash') ? '貨到付款' : '線上刷卡' }}</td>
          <td class="table_th_short"><button class="admin_button button_controll" @click="openDialog(idx)"><i
                class="fa-solid fa-pen"></i>查看</button></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 商品視窗 -->
  <div class="dialogBg">
    <form ref="valid" @submit.prevent="submit">
      <!-- 標題 -->
      <div class="dialogTitle">
        {{ '查看訂單明細' }}
        <div class="dialogClose" @click="dialogClose"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <!-- 內容 -->
      <div class="dialog_container">
        <div class="text_container">
          <div class="dialog_container_left">
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">訂單ID：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form._id" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">會員帳號：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.account" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">訂單金額：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.totalPrice" disabled />
              </div>
            </div>



          </div>
          <div class="dialog_container_right">

            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">取貨姓名：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.name" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">取貨電話：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.phone" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">取貨地址：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.address" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">付款方式：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.payway" disabled />
              </div>
            </div>



          </div>
        </div>


        <div class="dialog_btn_container">
          <button class="admin_button button_close" @click="dialogClose">關閉</button>
        </div>
      </div>
    </form>
  </div>
  <div class="darkDialogBg" @click="dialogClose"></div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiAuth } from '@/plugins/axios'
import Swal from 'sweetalert2'

const valid = ref(false)
const form = reactive({
  _id: '',
  account: '',
  totalPrice: '',
  name: '',
  address: '',
  phone: '',
  payway: '',
  idx: -1,
}
)

const dialogClose = () => {
  const darkDialogBg = document.querySelector('.darkDialogBg')
  const dialogBg = document.querySelector('.dialogBg')
  darkDialogBg.style.display = 'none'
  dialogBg.style.display = 'none'
}

const openDialog = (idx) => {
  form._id = orders[idx]._id
  form.account = orders[idx].u_id.account
  form.totalPrice = orders[idx].totalPrice
  form.name = orders[idx].name
  form.address = orders[idx].address
  form.phone = orders[idx].phone
  form.payway = orders[idx].payway
  const valid = ref(false)
  form.idx = idx

  const darkDialogBg = document.querySelector('.darkDialogBg')
  const dialogBg = document.querySelector('.dialogBg')
  darkDialogBg.style.display = 'block'
  dialogBg.style.display = 'block'
}

const orders = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((total, current) => {
        if (JSON.parse(current.custom).size == 'L') {
          return total + (current.p_id.lprice * current.quantity)
        } else {
          return total + (current.p_id.mprice * current.quantity)
        }

      }, 0)
      return order
    }))
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得訂單失敗'
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
