<template>
    <NavMenu></NavMenu>
    <!-- 內容 -------------------------------------------------------------->
    <div id="container">
        <div class="pageTitle">
            <span>CHECKOUT</span>
            <h1>結帳</h1>
        </div>
        <!-- 步驟流程 --------------------------------------------->
        <div class="processStep_container">
            <div class="processStep_circle_container">
                <div class="processStep_circle step1 circle_on">1
                    <div class="circletext1">購物車資料</div>
                </div>
                <div class="processStep_circle step2">2
                    <div class="circletext2">付款資料</div>
                </div>
                <div class="processStep_circle step3">3
                    <div class="circletext3">訂單確認</div>
                </div>
            </div>
            <div class="processStep_line_container">
                <div class="processStep_line_gary"></div>
                <div class="processStep_line_done"></div>
            </div>
        </div>
        <!-- 步驟一 -------------------------->
        <div class="processStep1_container" v-if="show === 1">
            <h1>購物車資料</h1>
            <div class="products_discount_display">
                <div class="allproducts_container">
                    <div class="product_container" v-for="(product, idx) in allcart" :key="product._id">
                        <div class="product_img"><img :src="product.p_id.image"></div>
                        <div class="product_text">
                            <div class="product_title_custom">
                                <div class="cart_product_title_delete">
                                    {{ product.p_id.name }}
                                </div>
                                <div class="cart_product_allcustom">
                                    <span v-if="JSON.parse(product.custom).size == 'M'">-中杯</span>
                                    <span v-if="JSON.parse(product.custom).size == 'L'">-大杯</span>
                                    <span v-if="JSON.parse(product.custom).ice == 'ice'">-冰</span>
                                    <span v-if="JSON.parse(product.custom).ice == 'hot'">-熱</span>
                                    <span v-if="JSON.parse(product.custom).sugar == 'sugar'">-全糖</span>
                                    <span v-if="JSON.parse(product.custom).sugar == 'nosugar'">-無糖</span>
                                </div>
                            </div>
                            <div class="cart_controllnum_titleprice">
                                <div class="cart_controllnum">
                                    <div class="cart_controllbtn" @click="updateCart(idx, -1)"><i
                                            class="fa-solid fa-minus"></i>
                                    </div>
                                    <input type="number" v-model="product.quantity">
                                    <div class="cart_controllbtn" @click="updateCart(idx, 1)"><i
                                            class="fa-solid fa-plus"></i>
                                    </div>
                                </div>
                                <!-- <span v-if="JSON.parse(product.custom).size == 'L'">NT${{ product.quantity *
                                    product.p_id.lprice
                                }}</span>
                                <span v-if="JSON.parse(product.custom).size == 'M'">NT${{ product.quantity *
                                    product.p_id.mprice
                                }}</span> -->
                            </div>
                            <i class="fa-solid fa-trash-can" @click="updateCart(idx, product.quantity * -1)"></i>
                        </div>

                    </div>
                </div>
                <div class="titlepriceDiscount_container">
                    <!-- <div class="discount_container">
                        <h2>使用折扣碼</h2>
                        <div class="discount_text_container">
                            <input type="number">
                            <button>使用</button>
                        </div>
                    </div> -->
                    <div class="total_container">
                        <div class="total_checkout">
                            <div class="total_text">
                                <div class="totalPrice">
                                    <p>商品金額</p>
                                    <span>${{ totalPrice }}</span>
                                </div>
                                <!-- <div class="discountPrice">
                                    <p>折扣金額</p>
                                    <span>-$50</span>
                                </div>
                                <div class="deletediscount">
                                    <div class="deletediscount_btn">不使用折扣碼</div>
                                </div> -->
                            </div>
                            <div class="discountTotalPrice">
                                <p>訂單總金額</p>
                                <span>${{ totalPrice }}</span>
                            </div>
                        </div>
                        <button class="checkout" @click="switcharea('checkout')" :disabled="canCheckout"><i
                                class="fa-solid fa-credit-card"></i>結帳
                        </button>
                    </div>

                </div>
            </div>

        </div>

        <!-- 步驟二 -------------------------->
        <div class="processStep2_container" v-if="show === 2">
            <h1>付款資料</h1>
            <form ref="valid" @submit.prevent="submitCart">
                <div class="paycontainer">
                    <div class="leftcontainer">
                        <div class="samecheckbox">
                            <p>訂購人資料</p>
                            <label for="memberInfo"><input type="checkbox" id="memberInfo" @change="write()"
                                    v-model="form.write">同會員資料</label>
                        </div>
                        <div class="input_container">
                            <label for="pay_name">姓名：</label>
                            <input type="text" id="pay_name" placeholder="請輸入您的姓名" v-model="form.name">
                        </div>
                        <div class="input_container">
                            <label for="pay_phone">手機：</label>
                            <input type="text" id="pay_phone" placeholder="請輸入您的手機號碼" v-model="form.phone">
                        </div>
                        <div class="input_container">
                            <label for="address">地址：</label>
                            <input type="text" id="address" placeholder="請輸入您的地址" v-model="form.address">
                        </div>
                    </div>
                    <div class="rightcontainer">
                        <div class="radio_container">
                            <label for="radioPay_online">付款方式：</label>
                            <div class="radio_choosebox">
                                <input type="radio" name="radio_pay" id="radioPay_online" value="cash"
                                    v-model="form.payway">
                                <label for="radioPay_online"><span></span>取貨付款</label>
                                <input type="radio" name="radio_pay" id="radioPay_cash" value="online"
                                    v-model="form.payway">
                                <label for="radioPay_cash"><span></span>線上付款</label>
                            </div>

                        </div>
                        <!-- 你好我是信用卡片 ------------------------------>
                        <div v-if="form.payway == 'online'" class="card_container">
                            <div class="input_container">
                                <label for="pay_phone">信用卡號：</label>
                                <div class="cardnum4">
                                    <input type="number" oninput="if(value.length>4)value=value.slice(0,3);"
                                        v-model="card.num1">
                                    <span>-</span>
                                    <input type="number" oninput="if(value.length>4)value=value.slice(0,3)"
                                        v-model="card.num2">
                                    <span>-</span>
                                    <input type="number" oninput="if(value.length>4)value=value.slice(0,3)"
                                        v-model="card.num3">
                                    <span>-</span>
                                    <input type="number" oninput="if(value.length>4)value=value.slice(0,3)"
                                        v-model="card.num4">
                                </div>

                            </div>
                            <div class="input_container">
                                <label for="pay_phone">卡片期限：</label>
                                <select name="" id="" v-model="card.year">
                                    <option value="" disabled selected>年份</option>
                                    <option value="23">2023</option>
                                    <option value="24">2024</option>
                                    <option value="25">2025</option>
                                    <option value="26">2026</option>
                                    <option value="27">2027</option>
                                    <option value="28">2028</option>
                                    <option value="29">2029</option>
                                    <option value="30">2030</option>
                                    <option value="31">2031</option>
                                    <option value="32">2032</option>
                                    <option value="33">2033</option>
                                    <option value="34">2034</option>
                                </select>
                                <select name="" id="" v-model="card.month">
                                    <option value="" disabled selected>月份</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div class="input_container">
                                <label for="pay_phone">認證號：</label>
                                <div class="cardnum4">
                                    <input type="number" oninput="if(value.length>3)value=value.slice(0,3)">
                                </div>

                            </div>
                            <div class="card_allcard">
                                <div class="back">
                                    <div class="allcard_cardnum">
                                        <span>{{ card.num1 }}</span>
                                        <span>{{ card.num2 }}</span>
                                        <span>{{ card.num3 }}</span>
                                        <span>{{ card.num4 }}</span>
                                    </div>
                                    <div class="allcard_month">
                                        <span>{{ card.year }}</span>
                                        <span>/</span>
                                        <span>{{ card.month }}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>




                <!-- 上一步下一步 -->
                <div class="btn_container">
                    <button class="payment_btn" @click="switcharea('cart')">上一步</button>
                    <button class="payment_btn" type="submit">下一步</button>
                </div>
            </form>
        </div>

        <!-- 步驟三 -------------------------->
        <div class="processStep3_container" v-if="show === 3">
            <h1>訂單完成!</h1>
            <h3>謝謝您的訂購，我們會盡快完成您的訂單。</h3>
            <div class="cart_display">
                <div class="cart_info">
                    <p>姓名：{{form.name}}</p>
                    <p>手機：{{form.phone}}</p>
                    <p>地址：{{form.address}}</p>
                    <p>付款方式：{{(form.payway=='cash')?'貨到付款':'線上付款'}}</p>
                    <p>訂單金額：{{totalPrice}}</p>
                </div>
                <div class="cartinfo_products_container">
                    <div class="cartinfo_products_container_title">訂單商品清單</div>
                    <div class="cartinfo_products_container_products">
                        <div class="cartinfo_products_container_product" v-for="(product, idx) in allcart"
                            :key="product._id">
                            <div class="product_img"><img :src="product.p_id.image"></div>

                            <div class="cart_product_title">
                                {{ product.p_id.name }}
                            </div>

                            <div class="cart_product_quantity">
                                ×{{ product.quantity }}
                            </div>
                        </div>
                    </div>
                    <div class="cartinfo_products_container_price">

                    </div>
                </div>
            </div>



        </div>

    </div>
</template>
<script setup>
import { apiAuth } from '@/plugins/axios'
import { reactive, computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import NavMenu from '@/components/NavMenu.vue'
import Swal from 'sweetalert2'

const user = useUserStore()

const { editCart, checkout } = user

const allcart = reactive([])
const show = ref(1)


const valid = ref(false)
const form = reactive({
    name: '',
    phone: '',
    address: '',
    payway: '',
    write: false
})

const write = () => {
    if (form.write) {
console.log(userinfo)
        form.name = userinfo.name
        form.phone = userinfo.phone
        form.address = userinfo.address
    }
}


const submitCart = () => {
    if (!valid.value) return
    console.log(123)
    checkout({ name: form.name, phone: form.phone, address: form.address, payway: form.payway, })
    switch3()
}

const switcharea = (key) => {
    const step1circle = document.querySelector('.step1')
    const step2circle = document.querySelector('.step2')
    const step3circle = document.querySelector('.step3')
    const circletext1 = document.querySelector('.circletext1')
    const circletext2 = document.querySelector('.circletext2')
    const circletext3 = document.querySelector('.circletext3')
    const line = document.querySelector('.processStep_line_done')
    if (key === 'cart') {
        show.value = 1
        step1circle.style.background = 'white'
        step1circle.style.color = '#fc9f4d'
        circletext1.style.color = '#fc9f4d'
        line.style.width = '0px'
        step2circle.classList.remove('circle_on')
    } else if (key === 'checkout') {
        show.value = 2
        step1circle.style.background = '#fc9f4d'
        step1circle.style.color = 'white'
        circletext1.style.color = '#fc9f4d'
        step2circle.classList.add('circle_on')
        line.style.width = '400px'
    } else {
        show.value = 3
        step1circle.style.background = '#fc9f4d'
        step1circle.style.color = 'white'
        step2circle.style.background = '#fc9f4d'
        step2circle.style.color = 'white'
        circletext2.style.color = '#fc9f4d'
        step3circle.classList.add('circle_on')
        line.style.width = '800px'
    }
}

const switch3= () =>{
    const step1circle = document.querySelector('.step1')
    const step2circle = document.querySelector('.step2')
    const step3circle = document.querySelector('.step3')
    const circletext1 = document.querySelector('.circletext1')
    const circletext2 = document.querySelector('.circletext2')
    const circletext3 = document.querySelector('.circletext3')
    const line = document.querySelector('.processStep_line_done')
    show.value = 3
        step1circle.style.background = '#fc9f4d'
        step1circle.style.color = 'white'
        step2circle.style.background = '#fc9f4d'
        step2circle.style.color = 'white'
        circletext2.style.color = '#fc9f4d'
        step3circle.classList.add('circle_on')
        line.style.width = '800px'
}

const showcard = () => {
    document
}

const card = reactive({
    onlinepay: false,
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    year: '',
    month: ''
})


// const canCheckout = computed(() => {
//     return cart.length > 0 && !cart.some(product => {
//         return !product.p_id.sell
//     })
// });



// 按鈕加減
const updateCart = async (idx, quantity) => {
    await editCart({ _id: allcart[idx].p_id._id, quantity, custom: allcart[idx].custom, showPu: false })
    allcart[idx].quantity += quantity
    if (allcart[idx].quantity <= 0) {
        allcart.splice(idx, 1)
    }
}

// 呼叫購物車資料
const getcart = async () => {
    try {
        allcart.length = 0
        const { data } = await apiAuth.get('/users/cart')
        allcart.push(...data.result)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '失敗',
            text: '取得購物車失敗'
        })
    }
}

// 總金額
const totalPrice = computed(() => {
    return allcart.reduce((total, current) => {
        if (JSON.parse(current.custom).size == 'L') {
            return total + (current.p_id.lprice * current.quantity)
        } else {
            return total + (current.p_id.mprice * current.quantity)
        }

    }, 0)
})


const userinfo = reactive({
    name: '',
    address: '',
    email: '',
    phone: '',
});

// 呼叫會員資料
const getuser = async () => {
    const { data } = await apiAuth.get('/users/me')
    userinfo.name = data.result.name
    userinfo.address = data.result.address
    userinfo.email = data.result.email
    userinfo.phone = data.result.phone
}


getcart()
getuser()
</script>