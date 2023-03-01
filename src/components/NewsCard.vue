<template>
  <router-link :to="'/news/' + _id" style="text-decoration: none;">
    <div class="news_img"><img :src="image" /></div>
    <div class="news_textarea">
      <span>{{ new Date(date).toLocaleDateString().replaceAll("/","-")}}</span>
      <span>{{category}}</span>
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <router-link :to="'/news/' + _id" style="text-decoration: none;">
        MORE
        <i class="fa-solid fa-angle-right"></i>
      </router-link>
    </div>
 </router-link>
</template>

<script setup>
defineProps({
  _id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
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
  show: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: ''
  }
})

</script>
