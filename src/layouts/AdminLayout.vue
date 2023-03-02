<template>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <!-- logo 帳號名稱 登出 ------------------------->
    <header id="admin_header">
        <div id="admin_logo">BCcoffee後台管理</div>
        <div id="admin_account">
            <img :src="avatar">
            <div id="admin_account_value">{{ account }}</div>
        </div>
    </header>
    <main id="admin_main">
        <nav id="admin_nav">
            <ul>
                <li><routerLink to="/admin/users">會員管理</routerLink></li>
                <li>
                    <routerLink to="/admin/orders">訂單管理</routerLink>
                </li>
                <li>
                    <routerLink to="/admin/products">商品管理</routerLink>
                </li>
                <li><routerLink to="/admin/news">消息管理</routerLink></li>
                <li><routerLink to="/admin/qa">Q&A管理</routerLink></li>
                <li>
                    <routerLink to="/">回首頁</routerLink>
                </li>
            </ul>
        </nav>
        <div class="main_view">
            <router-view></router-view>
        </div>
    </main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const { avatar, account } = storeToRefs(user)
</script>