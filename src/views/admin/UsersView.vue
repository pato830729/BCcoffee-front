<template>
  <div class="admin_title_search">
    <div class="admin_title_addDelete">
      <h1>會員管理</h1>
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
      <input type="text" class="search_input" placeholder="以會員編號搜尋" />
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
          <th class="table_th_id">會員ID</th>
          <th class="table_th_ell">帳號</th>
          <th class="table_th_ell">信箱</th>
          <th class="table_th_ell">狀態</th>
          <th class="table_th_short"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="user._id">
          <td class="table_td_id">{{ user._id }}</td>
          <td class="table_td_ell">{{ user.account }}</td>
          <td class="table_td_ell">{{ user.email }}</td>
          <td class="table_td_ell" :style="(user.suspension) ? 'color:#52b96c;' : 'color:#e43939;'">{{
            (user.suspension) ? '正常' : '停權' }}</td>
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
        {{ '編輯會員' }}
        <div class="dialogClose" @click="dialogClose"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <!-- 內容 -->
      <div class="dialog_container">
        <div class="text_container">
          <div class="dialog_container_left">
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">會員ID：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form._id" disabled />
              </div>
            </div>

            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">帳號：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.account" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">信箱：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.email" disabled />
              </div>
            </div>

            <div class="adminDialogBg_selectStyle">
              <label for="dialog_select_sell">狀態：</label>
              <select id="dialog_select_sell" v-model="form.suspension">
                <option value="true" selected>正常</option>
                <option value="false">停權</option>
              </select>
            </div>

          </div>
          <div class="dialog_container_right">
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">姓名：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.name" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">地址：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.address" disabled />
              </div>
            </div>
            <div class="adminDialogBg_inputStyle">
              <label for="dialog_name">電話：</label>
              <div class="input_position">
                <input type="text" id="dialog_name" v-model="form.phone" disabled />
              </div>
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
import { reactive, ref } from 'vue'
import { apiAuth } from '@/plugins/axios'
import Swal from 'sweetalert2'

const valid = ref(false)
const form = reactive({
  _id: '',
  account: '',
  email: '',
  name: '',
  address: '',
  phone: '',
  suspension: false,
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
  form._id = users[idx]._id
  form.account = users[idx].account
  form.email = users[idx].email
  form.name = users[idx].name
  form.address = users[idx].address
  form.phone = users[idx].phone
  form.suspension = users[idx].suspension
  const valid = ref(false)
  form.idx = idx

  const darkDialogBg = document.querySelector('.darkDialogBg')
  const dialogBg = document.querySelector('.dialogBg')
  darkDialogBg.style.display = 'block'
  dialogBg.style.display = 'block'
}

const submit = async () => {
  if (!valid.value) return
  const fd = new FormData()
  fd.append('suspension', form.suspension)
  // try {
  const { data } = await apiAuth.patch('/users/' + form._id, fd)
  users[form.idx] = data.result
  Swal.fire({
    icon: 'success',
    title: '成功',
    text: '編輯成功'
  })
  dialogClose()

  // } catch (error) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: '失敗',
  //     text: error?.response?.data?.message || '發生錯誤'
  //   })
  // }
}

const users = reactive([]);
(async () => {
  try {
    const { data } = await apiAuth.get('/users/all')
    users.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得會員失敗'
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
