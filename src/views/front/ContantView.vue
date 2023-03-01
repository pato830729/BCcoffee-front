<template>
    <NavMenu></NavMenu>
    <!-- 內容 -------------------------------------------------------------->
    <div id="container">
        <div class="pageTitle">
            <span>CONTANT</span>
            <h1>聯絡我們</h1>
        </div>

        <div id="contant_container">
            <div class="left_contant">
                <div class="left_contant_box">
                    <p>歡迎來到我們的聯絡頁面，我們非常重視與您的溝通和互動。如果您有任何問題、建議、或者合作機會，請不要猶豫聯繫我們。</p>
                </div>
                <div class="left_contant_box">
                    <div class="phone_area">
                        <div class="area_title">
                            <i class="fa-solid fa-phone"></i>
                            <h4>來電聯繫</h4>
                        </div>
                    </div>
                    <h3>客服接聽時間：9:00~20:00</h3>
                    <h3>TEL：02-21234567</h3>
                </div>
                <div class="left_contant_box">
                    <div class="line_area">
                        <div class="area_title">
                            <i class="fa-brands fa-line"></i>
                            <h4>LINE聯繫</h4>
                        </div>
                    </div>
                    <p>如果您有任何問題、意見、或者需要技術支持，請透過LINE與我們聯繫。您只需要添加我們的LINE賬號，即可立即與我們聯繫，我們將在第一時間回復您的信息。</p>
                    <div class="line_img_container">
                        <img src="../../images/230201192655.png">
                    </div>
                </div>
            </div>
            <div class="right_contant">
                <div class="text_area">
                    <h2>信件聯繫</h2>
                    <input type="text" placeholder="請輸入您的姓名">
                    <input type="text" placeholder="請輸入您的連絡電話">
                    <input type="text" placeholder="請輸入您的信箱">
                    <div class="text_radiobox">
                        <h4>希望我們連繫您的方式</h4>
                        <div><input type="radio" name="text_radio" class="text_radio" id="phone_radio">
                            <label for="phone_radio"><span></span>電話</label>
                        </div>
                        <div><input type="radio" name="text_radio" class="text_radio" id="mail_radio">
                            <label for="mail_radio"><span></span>EMAIL</label>
                        </div>
                    </div>
                    <textarea></textarea>
                </div>
                <div class="contant_btn">
                    <div>送出</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import NavMenu from '@/components/NavMenu.vue'
</script>