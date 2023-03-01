<template>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <!-- 關閉鈕 ---------------------------------------------------------->
    <div class="signIn_out">
        <div class="signIn_out_box">
            <div class="signIn_outline line01"></div>
            <div class="signIn_outline line02"></div>
        </div>
    </div>
    <!-- 左右區塊分割 ------------------------------------------------------>
    <div id="left_container">
        <!-- 登入 --------------------------------------------------------->
        <div class="signIn_container">
            <form ref="valid" @submit.prevent="login">
                <h1>WELCOME BACK</h1>
                <h3>立即登入帳號</h3>
                <div class="label_margin">
                    <label class="input_signIn">
                        <input type="text" maxlength="20" placeholder="請輸入您的帳號" v-model="form.account" @blur="check('account')">
                    </label>
                    <p class="error_p" v-if="chk_arr.account && rules.required(form.account) !== true">{{rules.required(form.account)}}</p>
                    <p class="error_p" v-if="chk_arr.account && rules.length(form.account) !== true">{{rules.length(form.account)}}</p>
                </div> 
                <div class="label_margin">
                    <label class="input_password">
                        <input type="password" placeholder="請輸入您的密碼" v-model="form.password" @blur="check('password')"></label>
                    <p class="error_p" v-if="chk_arr.password && rules.required(form.password) !== true">{{rules.required(form.password)}}</p>
                    <p class="error_p" v-if="chk_arr.password && rules.length(form.password) !== true">{{rules.length(form.password)}}</p>
                </div> 
                <!-- <a href="#">忘記密碼?</a> -->
                <button class="signUp_btn" type="submit">登入</button>  
            </form>
        </div>
    </div>
    <div id="right_container">
        <!-- 登出 --------------------------------------------------------->
        <div class="signUp_container">
            <form ref="valid" @submit.prevent="register">
              <h1>REGISTER</h1>
                <h3>創建新帳戶</h3>    
                <div class="label_margin">
                    <label class="input_signIn">
                        <input type="text" maxlength="20" placeholder="請輸入您的帳號" v-model="form.account" @blur="check('account')">
                    </label>
                    <p class="error_p" v-if="chk_arr.account && rules.required(form.account) !== true">{{rules.required(form.account)}}</p>
                    <p class="error_p" v-if="chk_arr.account && rules.length(form.account) !== true">{{rules.length(form.account)}}</p>
                </div>      
                <div class="label_margin">
                    <label class="input_mail">
                        <input type="text" placeholder="請輸入您的信箱" v-model="form.email" @blur="check('email')">
                    </label>
                    <p class="error_p" v-if="chk_arr.email && rules.required(form.email) !== true">{{rules.required(form.email)}}</p>
                    <p class="error_p" v-if="chk_arr.email && rules.email(form.email) !== true">{{rules.email(form.email)}}</p>
                </div>  
                <div class="label_margin">
                    <label class="input_password">
                        <input type="password" placeholder="請輸入您的密碼" v-model="form.password" @blur="check('password')"></label>
                    <p class="error_p" v-if="chk_arr.password && rules.required(form.password) !== true">{{rules.required(form.password)}}</p>
                    <p class="error_p" v-if="chk_arr.password && rules.length(form.password) !== true">{{rules.length(form.password)}}</p>
                </div> 
                <div class="label_margin">
                    <label class="input_password">
                        <input type="password" placeholder="請再次輸入您的密碼" v-model="form.passwordConfirm" @blur="check('passwordConfirm')"></label>
                    <p class="error_p" v-if="chk_arr.passwordConfirm && rules.required(form.passwordConfirm) !== true">{{rules.required(form.passwordConfirm)}}</p>
                    <p class="error_p" v-if="chk_arr.passwordConfirm && rules.passwordConfirm(form.passwordConfirm) !== true">{{rules.passwordConfirm(form.passwordConfirm)}}</p>
                </div> 
                <button class="signUp_btn" type="submit">註冊</button>  
            </form>
        </div>
    </div>

    <!-- 深色滑動區塊 ------------------------------------------------------>
    <div id="dark_bg">
        <!-- 註冊滑面 ----------------------------------------------------->
        <div class="dark_bg_signUp">
            <h1>嗨，新朋友!</h1>
            <p>還沒有帳號?</p>
            <p>快來註冊帳號，一起享受美好的咖啡生活吧!</p>
            <button class="signUp_switch">註冊</button>
        </div>
        <!-- 登入滑面 ----------------------------------------------------->
        <div class="dark_bg_signIp">
            <h1>朋友，歡迎回來!</h1>
            <p>線上選購一杯香醇的咖啡</p>
            <p>帶來振奮的早晨和放鬆的午餐吧!</p>
            <button class="signIp_switch">登入</button>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import validator from 'validator'
import { api } from '@/plugins/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

onMounted(() => {
const darkBgsignIp = document.querySelector('.dark_bg_signIp')
const darkBgsignUp = document.querySelector('.dark_bg_signUp')
const darkBg = document.querySelector('#dark_bg')
const signUpswitch = document.querySelector('.signUp_switch')
const signIpswitch = document.querySelector('.signIp_switch')
const signInout = document.querySelector('.signIn_out')
const signInoutline = document.querySelectorAll('.signIn_outline')
darkBgsignIp.style.display = 'none'
signUpswitch.addEventListener('click', () => {
    darkBg.style.right = '50%'
    darkBgsignUp.style.display = 'none'
    darkBgsignIp.style.display = 'block'
    for(let t in chk_arr) chk_arr[t] = false
    for(let l =0;l < signInoutline.length;l++){
        signInoutline[l].style.background = '#a35e47'
    }
  })
signIpswitch.addEventListener('click', () => {
    darkBg.style.right = '0%'
    darkBgsignIp.style.display = 'none'
    darkBgsignUp.style.display = 'block'
    for(let t in chk_arr) chk_arr[t] = false
    for(let l =0;l < signInoutline.length;l++){
        signInoutline[l].style.background = '#fff'
    }
})
signInout.addEventListener('click', () => {
    history.back()
})
  })

const router = useRouter()
const user = useUserStore()

const valid = ref(false)
// const loading = ref(false)
const form = reactive({
    account:'',
    email:'',
    password:'',
    passwordConfirm: ''
})

const rules = {
    email(value){
        return validator.isEmail(value) || '格式錯誤'
    },
    required(value){
        return !!value || '欄位必填'
    },
    length (value) {
        return (value.length >= 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
    },
    passwordConfirm (value) {
        return (value === form.password) || '密碼不一致'
  }
}

const chk_arr = reactive({
    account:false,
    email:false,
    password:false,
    passwordConfirm: false
})

function check(type){
    chk_arr[type] = true;
}

const register = async () => {
  if (!valid.value) return
//   loading.value = true
  try {
    await api.post('/users', form)
    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
//   loading.value = false
}

const login = async () => {
//   loading.value = true
  await user.login(form)
//   loading.value = false
}
</script>