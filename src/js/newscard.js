for (i = 0; i < 6; i++) {
  $('#news_cardBox').append(`
  <div class="news_card">
  <div class="news_img"><img src="https://picsum.photos/300/200/?random=10">
  </div>
  <div class="news_textarea">
    <span>2023.01.31</span>
    <span>新品上市</span>
    <h1>少しひらべったくなって、またくるくると包んで紐でくくりました。</h1>
    <p>だから、いま小さいの見えなかったねえジョバンニはもう頭を引っ込めて、こっちを見ながら答えました。</p>
    <a href="news_moreinfo.html">MORE<i class="fa-solid fa-angle-right"></i></a>
  </div>
  </div>`)
}

$('.addnewsbtn').on('click', function () {
  for (i = 0; i < 6; i++) {
    $('#news_cardBox').append(`
    <div class="news_card">
    <div class="news_img"><img src="https://picsum.photos/300/200/?random=10">
    </div>
    <div class="news_textarea">
      <span>2023.01.31</span>
      <span>新品上市</span>
      <h1>少しひらべったくなって、またくるくると包んで紐でくくりました。</h1>
      <p>だから、いま小さいの見えなかったねえジョバンニはもう頭を引っ込めて、こっちを見ながら答えました。</p>
      <a href="news_moreinfo.html">MORE<i class="fa-solid fa-angle-right"></i></a>
    </div>
    </div>`)
  }
})
