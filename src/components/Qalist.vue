<template>
  <div class="qa_flex">
    <div class="qa_text">
      <span>Q</span>
      <p>{{ question }}</p>
    </div>
    <div class="qa_infobtn" @click="removeClass">
      <div v-bind:class="{ qa_infobtn_line: line, rotate: rotate }"></div>
      <div class="qa_infobtn_line"></div>
    </div>
  </div>
  <Transition name="ansShow">
    <div class="qa_flex" v-if="show === true">
      <div class="qa_text">
        <span style="color: rgb(252, 159, 77)">A</span>
        <p style="color: rgb(252, 159, 77)">{{ answer }}</p>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  _id: {
    type: String,
    default: ''
  },
  question: {
    type: String,
    default: ''
  },
  answer: {
    type: String,
    default: ''
  }
})

const show = ref(false)
const rotate = ref(true)
const line = ref(true)
const removeClass = () => {
  if (rotate.value == false) {
    rotate.value = true
    show.value = false
  } else {
    rotate.value = false
    show.value = true
  }
}
</script>
