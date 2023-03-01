<template>
  <div class="qa_flex">
    <div class="qa_text">
      <span>Q</span>
      <p>{{ question }}</p>
    </div>
    <div class="qa_infobtn" @click="showAns">
      <div class="qa_infobtn_line rotate"></div>
      <div class="qa_infobtn_line"></div>
    </div>
  </div>
  <Transition name="ansShow">
    <div class="qa_flex" v-if="show === true">
      <div class="qa_text">
        <span style="color:rgb(252, 159, 77);">A</span>
        <p style="color:rgb(252, 159, 77);">{{ answer }}</p>
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
const showAns = () => {
  const qaInfobtn = document.querySelectorAll('.qa_infobtn')
  for (let i = 0; i < qaInfobtn.length; i++) {
    if (qaInfobtn[i].firstChild.classList.contains('rotate')) {
      qaInfobtn[i].firstChild.classList.remove('rotate')
      show.value = true
    } else {
      qaInfobtn[i].firstChild.classList.add('rotate')
      show.value = false
    }
  }
}
</script>
