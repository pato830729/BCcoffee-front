<template>
    <NavMenu></NavMenu>

    <div id="all_container">
        <!-- about us --------------------------------------------------------->
        <div id="aboutUs_container">
            <div class="aboutUs_position">
                <div class="index_textarea">
                    <h1>ABOUT US</h1>
                    <h4>關於我們</h4>
                    <p>提供高品質的咖啡，同時致力於保護環境和支持社區。該咖啡店的咖啡豆來自於全球各地的精品咖啡種植區域，所有豆子都是以永續和公平貿易方式獲取的。
                    </p>
                    <div class="arrow">
                        <router-link to="/aboutus">
                            <span></span>
                            更多關於我們
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="aboutus_rightbg"><img src="../../images/index/aboutus_rightbg.png"></div>
            
        </div>
        <!-- product ---------------------------------------------------------->
        <div id="product_container">
            <div class="product_position">
                <div class="products_bigshow_container">
                    <div class="products_bigshow">
                        <div class="products_showtext">
                            <div class="products_showtext_box">
                                <h1>經典拿鐵 LATTE</h1>
                                <p>經典拿鐵是咖啡愛好者最愛的口味之一，它由新鮮烘焙的咖啡豆和微甜的牛奶製成。</p>
                            </div>
                            <a href="">KNOW MORE<i class="fa-solid fa-angle-right"></i></a>
                        </div>
                        <div class="products_showleft">
                            <img src="../../images/products/lattle.png">
                        </div>
                        <div class="products_showbg"></div>
                    </div>
                </div>
                <div class="products_small_container1">
                    <div class="products_smallshow">
                        <div class="products_smalltext">
                            <div class="products_smalltext_box">
                                <h1>海鹽焦糖拿鐵</h1>
                                <p>海鹽焦糖拿鐵是一款特別的拿鐵，它在傳統拿鐵的基礎上增加了焦糖和海鹽的獨特組合。</p>
                            </div>
                            <a href="">KNOW MORE<i class="fa-solid fa-angle-right"></i></a>
                        </div>
                        <div class="products_smallleft">
                            <img src="../../images/products/seasolt.png">
                        </div>
                        <div class="products_smallbg"></div>
                    </div>
                </div>
                <div class="products_small_container2">
                    <div class="products_smallshow">
                        <div class="products_smalltext">
                            <div class="products_smalltext_box">
                                <h1>靜岡抹茶拿鐵</h1>
                                <p>靜岡抹茶拿鐵是一款結合了日本傳統抹茶和咖啡文化的拿鐵。</p>
                            </div>
                            <a href="">KNOW MORE<i class="fa-solid fa-angle-right"></i></a>
                        </div>
                        <div class="products_smallleft">
                            <img src="../../images/products/mocha.png">
                        </div>
                        <div class="products_smallbg"></div>
                    </div>
                </div>
                <div class="products_small_container3">
                    <div class="products_smallshow">
                        <div class="products_smalltext">
                            <div class="products_smalltext_box">
                                <h1>摩卡咖啡</h1>
                                <p>摩卡咖啡是一款口感豐富的咖啡飲品，它將新鮮的咖啡和朱古力融合在一起。</p>
                            </div>
                            <router-link to="/products">KNOW MORE<i class="fa-solid fa-angle-right"></i></router-link>
                        </div>
                        <div class="products_smallleft">
                            <img src="../../images/products/moca.png">
                        </div>
                        <div class="products_smallbg"></div>
                    </div>
                </div>
                <div class="index_textarea">
                    <h1>ORDER</h1>
                    <h4>外送訂餐</h4>
                    <p>我們的咖啡師都是經驗豐富、專業的人才，能夠為您製作出各種風味豐富、口感細緻的咖啡。我們使用最新鮮、最優質的咖啡豆，以及最新的咖啡機和設備，確保您每一杯咖啡都能夠呈現最佳的口感和風味。
                    </p>
                    <div class="arrow">
                        <router-link to="/products">
                            <span></span>
                            更多外送菜單
                        </router-link>
                    </div>
                </div>
            </div>


        </div>

        <!-- news ------------------------------------------------------------->
        <div id="news_container">
            <div class="news_position">

                <div class="index_textarea">
                    <h1>NEWS</h1>
                    <h4>最新消息</h4>
                    <div id="news_cardBox">
                        <div class="news_card" v-for="(news, idx) in news.slice(0, 3)" :key="news._id">
                            <NewsCard v-bind="news"></NewsCard>
                        </div>

                        <div class="arrow">
                            <router-link to="/news">
                                <span></span>
                                更多消息
                            </router-link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- shop ------------------------------------------------------------->
        <div id="shop_container">
            <div class="shop_position">
                <div class="index_textarea">
                    <h1>SHOP</h1>
                    <h4>店鋪資訊</h4>
                    <span class="shop_line"></span>
                    <div class="address_display">
                        <ul>
                            <li>地址</li>
                            <li>營業時間</li>
                            <li>定休日</li>
                            <li>TEL</li>
                        </ul>
                        <ul>
                            <li>新北市泰山區貴子里致遠新村55之1號</li>
                            <li>08:30~17:30</li>
                            <li>星期一</li>
                            <li>02-29018274</li>
                        </ul>
                    </div>
                    <div class="arrow">
                        <router-link to="/contant">
                            <span></span>
                            聯繫我們
                        </router-link>
                    </div>
                </div>
                <div class="circle_animation"></div>
            </div>
        </div>


    </div>

    <!-- 樹葉 -->
    <div class="video_mask">
        <video autoplay muted loop>
            <source
                src="../../images/Palm Tree Shadow Free White Background Videos, Motion Graphics, No Copyright _ All Background Videos.mp4"
                type="video/mp4">
        </video>
    </div>
</template>

<script setup>
import { api } from '@/plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import NewsCard from '@/components/NewsCard.vue'
import NavMenu from '@/components/NavMenu.vue'

const news = reactive([]);
const newsAll = reactive([]);

const switchNews = (type) => {
    news.length = 0
    for (const key in newsAll) {
        if (type == newsAll[key].category || type == "All") {
            news.push(newsAll[key])
        }
    }
}


    (async () => {
        try {
            const { data } = await api.get('/news')
            newsAll.push(...Array.from(data.result).reverse())
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '失敗',
                text: error?.response?.data?.message || '發生錯誤'
            })
        }

        switchNews("All")
    })()
</script>