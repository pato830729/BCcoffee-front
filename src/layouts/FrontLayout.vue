<template>
    <router-view></router-view>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const { isLogin, isAdmin, cart } = storeToRefs(user)
const { logout } = user

</script>