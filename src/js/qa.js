// $('.qa_infobtn').on('click', function () {
//   if ($(this).children().eq(0).hasClass('rotate')) {
//     $(this).children().eq(0).removeClass('rotate')
//     $(this).parent().after(`<li class="qa_list">
//     <div class="qa_text">
//     <span>A</span>
//     <p style="font-size: 14px;">けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。</p>
//     </div>
//    </li>`)
//   } else {
//     $(this).children().eq(0).addClass('rotate')
//     $(this).parent().next().remove()
//   }
// })

export const qa = () => {
  const qaInfobtn = document.querySelectorAll('.qa_infobtn')
  for (let i = 0; i < qaInfobtn.length; i++) {
    qaInfobtn[i].addEventListener('click', () => {
      if (qaInfobtn[i].firstChild.classList.contains('rotate')) {
        qaInfobtn[i].firstChild.classList.remove('rotate')
      } else {
        qaInfobtn[i].firstChild.classList.add('rotate')
      }
    })
  }
  // $('.qa_infobtn').on('click', function () {
  //   if ($(this).children().eq(0).hasClass('rotate')) {
  //     $(this).children().eq(0).removeClass('rotate')
  //     $(this).parent().after(`<li class="qa_list">
  //     <div class="qa_text">
  //     <span>A</span>
  //     <p style="font-size: 14px;">けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。けれどもあとカムパネルラが見えないねえその時向こう岸ちかくの少し下流の方で起こって、それは次の頁だよ。</p>
  //     </div>
  //    </li>`)
  //   } else {
  //     $(this).children().eq(0).addClass('rotate')
  //     $(this).parent().next().remove()
  //   }
  // })
}
