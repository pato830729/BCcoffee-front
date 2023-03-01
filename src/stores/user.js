import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api,apiAuth } from '@/plugins/axios'
import Swal from 'sweetalert2'
import router from '@/plugins/router'

export const useUserStore = defineStore('user', () => {
  const token= ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(0)
  const suspension = ref(false)
  const address = ref('')
  const phone = ref('')
  const name = ref('')

  const isLogin = computed(() => {
    return token.value.length > 0
  })
  const isAdmin = computed(() => {
    return role.value === 1
  })

  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/512/${account.value}?colors=21203f,fff1ce,e7bfa5,c5a898,4b3c5d`
  })

  const login = async (form) => {
    const { data } = await api.post('/users/login', form)
    if(data.result.suspension == false){
    //   try {
      token.value = data.result.token
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
      suspension.value = data.result.suspension
      address.value = data.result.address
      phone.value = data.result.phone
      name.suspension = data.result.name
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登入成功'
      })
      router.push('/')
    // } catch (error) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '失敗',
    //     text: error?.response?.data?.message || '發生錯誤'
    //   })
    // }
    }else{
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: '此帳號已停權'
      })
    }
    
  }

  const logout = async () => {
    try {
      await apiAuth.delete('/users/logout')
      token.value =''
      account.value = ''
      role.value = 0
      cart.value = 0
      suspension.value = false
      address.value = ''
      phone.value = ''
      name.suspension = ''
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登出成功'
      })
      router.push('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const getUser = async()=>{
    if(token.value.length === 0)return
    try {
      const {data} = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
      suspension.value = data.result.suspension
      address.value = data.result.address
      phone.value = data.result.phone
      name.value = data.result.name
    } catch (error) {
      logout()
    }
  }

  const editCart = async ({ _id, quantity,custom,showPu }) => {
    if (token.value.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: '請先登入'
      })
      router.push('/register')
      return
    }
    try {
      const { data } = await apiAuth.post('/users/cart', { p_id: _id, quantity: parseInt(quantity),custom:custom })
      cart.value = data.result
      if(showPu){
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '加入購物車成功'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const editUserInfo = async ({ name, address,email,phone }) => {
    if (token.value.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: '請先登入'
      })
      router.push('/register')
      return
    }
    try {
      const { data } = await apiAuth.post('/users/me', { name: name,address:address,email:email,phone:phone })
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '會員資料更新成功'
        })
    } catch (error) {
      console.log(1234)
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const checkout = async ({name,phone,address,payway}) => {
    try {
      await apiAuth.post('/orders',{ name: name,phone:phone,address:address,payway:payway })
      cart.value = 0
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '結帳成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }


  return{
    token,account,email,cart,role,login,logout,getUser,isLogin,
    isAdmin,avatar,editCart,editUserInfo,checkout
  }
},{
  persist:{
    key:'20230213',
    paths:['token']
  }
})