<template>
    <NavMenu></NavMenu>

    <!-- 內容 -------------------------------------------------------------->
    <div id="container">
        <div class="pageTitle">
            <span>ACCONT</span>
            <h1>會員資料</h1>
            <div id="sort">
                <ul class="sort_box">
                    <li class="sort_item" @click="switcharea('profileinfo')">會員資料</li>
                    <!-- <li class="sort_item" @click="switcharea('password')">修改密碼</li> -->
                    <li class="sort_item" @click="switcharea('order')">訂單查詢</li>
                </ul>
                <div class="sort_linebox">
                    <div class="sort_lineFocus"></div>
                    <div class="sort_line"></div>
                </div>
            </div>
        </div>

        <!-- 會員資料 ----------------------------------------------->
        <div v-if="show === 1" class="profile_container">
            <form ref="valid" @submit.prevent="submituser">
                <div class="text_area">
                    <div class="label_position"><label class="text_label">姓名：</label>
                        <input type="text" v-model="userinfo.name">
                    </div>
                    <!-- <div class="label_position">
                    <label class="text_label">性別：</label>
                    <div class="text_radiobox">
                        <div><input type="radio" name="text_radio" class="text_radio" id="phone_radio" checked>
                            <label for="phone_radio"><span></span>男性</label>
                        </div>
                        <div><input type="radio" name="text_radio" class="text_radio" id="mail_radio">
                            <label for="mail_radio"><span></span>女性</label>
                        </div>
                    </div>
                </div> -->
                    <div class="label_position"><label class="text_label">信箱：</label>
                        <input type="text" v-model="userinfo.email">
                    </div>
                    <div class="label_position"><label class="text_label">手機號碼：</label>
                        <input type="text" v-model="userinfo.phone">
                    </div>
                    <div class="label_position"><label class="text_label">地址：</label>
                        <input type="text" v-model="userinfo.address">
                    </div>

                </div>
                <div class="contant_btn">
                    <button type="submit">儲存</button>
                </div>
            </form>
        </div>

        <!-- 修改密碼 ----------------------------------------------->
        <div v-if="show === 2" class="password_container">
            <div class="text_area">
                <input type="text" placeholder="請輸入您的舊密碼">
                <input type="text" placeholder="請再次輸入您的舊密碼">
                <input type="text" placeholder="請輸入您的新密碼">
            </div>
            <div class="contant_btn">
                <div>修改</div>
            </div>
        </div>

        <!-- 訂單查詢 ----------------------------------------------->
        <div v-if="show === 3" class="order_container">
            <div class="search_container">
                <input type="text" placeholder="以訂單編號搜尋">
                <button>搜尋</button>
            </div>

            <div class="shoppingForm_table">
                <div class="shoppingForm_title">
                    <div>訂單編號</div>
                    <div>日期</div>
                    <div>金額</div>
                    <div>詳細資訊</div>
                </div>
                <div class="shoppingForm_info" v-for="(order, idx) in orders" :key="order._id">
                    <div>{{ order._id }}</div>
                    <div>{{ new Date(order.date).toLocaleDateString() }}</div>
                    <div>{{ order.totalPrice }}</div>
                    <div><button @click="popup(idx)">詳細資訊</button></div>
                    <div v-if="showpop == idx" class="account_popup_background" @click="out"></div>
                    <div class="account_popup" v-if="showpop == idx">
                        <div class="popup_title">
                            詳細資料<i class="fa-solid fa-xmark" @click="out"></i>
                        </div>

                        <div class="popup_person">
                            <p>收貨人姓名：{{ order.name }}</p>
                            <p>收貨人電話：{{ order.phone }}</p>
                            <p>收貨人地址：{{ order.address }}</p>
                            <p>付款方式：{{ (order.payway=='cash')?'貨到付款':'線上刷卡' }}</p>
                        </div>

                        <div class="popup_productsall">
                            <div class="popup_products" v-for="product in order.products" :key="product._id">
                                <span>{{ product.p_id.name }}</span>
                                <span v-if="JSON.parse(product.custom).size == 'M'">-中杯</span>
                                <span v-if="JSON.parse(product.custom).size == 'L'">-大杯</span>
                                <span v-if="JSON.parse(product.custom).ice == 'ice'">-冰</span>
                                <span v-if="JSON.parse(product.custom).ice == 'hot'">-熱</span>
                                <span v-if="JSON.parse(product.custom).sugar == 'sugar'">-全糖</span>
                                <span v-if="JSON.parse(product.custom).sugar == 'nosugar'">-無糖</span>
                                <span> *{{ product.quantity }}</span>
                            </div>
                        </div>


                    </div>
                </div>


            </div>

        </div>
    </div>
</template>
<script setup>
import NavMenu from '../../components/NavMenu.vue'
import { onMounted, ref, reactive } from 'vue'
import { apiAuth } from '../../plugins/axios'
import { useUserStore } from '../../stores/user'
import { useRoute, useRouter } from 'vue-router'
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

const show = ref(1)
const showpop = ref(-1)
const popup = (idx) => {
    showpop.value = idx
}
const out = () => {
    showpop.value = -1
}
const switcharea = (key) => {
    if (key === 'profileinfo') {
        show.value = 1
        console.log(key)
    } else if (key === 'password') {
        show.value = 2
    } else {
        show.value = 3
        console.log(key)
    }
}

const valid = ref(false)
const user = useUserStore()
const { editUserInfo } = user


const submituser = () => {
    if (!valid.value) return
    editUserInfo({ name: userinfo.name, address: userinfo.address, email: userinfo.email, phone: userinfo.phone })
}

const userinfo = reactive({
    name: '',
    address: '',
    email: '',
    phone: '',
    _id: ''
});



(async () => {
    // try {
    const { data } = await apiAuth.get('/users/me')
    userinfo.name = data.result.name
    userinfo.address = data.result.address
    userinfo.email = data.result.email
    userinfo.phone = data.result.phone
    userinfo._id = data.result.phone

})()



const orders = reactive([]);

(async () => {
    try {
        const { data } = await apiAuth.get('/orders')
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