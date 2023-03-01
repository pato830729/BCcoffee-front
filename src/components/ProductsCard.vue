<template>
    <div class="cardimg_bg">
        <div class="cardimg"></div>
    </div>
    <div class="card_textbox">
        <h2>{{ name }}</h2>
        <span class="ordercard_size">M</span>
        <span class="ordercard_prize">${{ mprice }}</span>
        <span class="ordercard_size">L</span>
        <span class="ordercard_prize">${{ lprice }}</span>
    </div>
    <div class="card_btn" @click="open">加入購物車</div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    _id: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    mprice: {
        type: Number,
        default: ''
    },
    lprice: {
        type: Number,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    sell: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: ''
    }
})


const show = ref(false)
const open = () => {
    show.value = true
    console.log(show.value)
}

</script>