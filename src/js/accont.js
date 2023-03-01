$('.display_area').eq(0).css('display', 'block')

$('.sort_item').on('click', function () {
  const index = $(this).index()
  $('.display_area').fadeIn()
  $('.display_area').eq(`${index}`).siblings('.display_area').css('display', 'none')
})
