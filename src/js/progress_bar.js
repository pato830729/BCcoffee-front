$(document).ready(function () {
  $('.circle_container').each(function (index, container) {
    $(container)
      .children()
      .each((index, elm) => {
        if ($(elm).hasClass('circle_processing')) {
          const line_done = $(container).next().children().children('.line_done')
          const btn_control = $(elm).parent().parent().next()
          if (index === 0) {
            line_done.css('width', '0%')
            $(elm).children('span').css('color', '#fc9f4d')
            btn_control.children('.progress_btn_again').css('display', 'none')
            btn_control.children('.progress_btn_cancel').css('display', 'block')
          } else if (index === 1) {
            line_done.css('width', '33%')
            btn_control.children('.progress_btn_again').css('display', 'none')
            btn_control.children('.progress_btn_cancel').css('display', 'block')
          } else if (index === 2) {
            line_done.css('width', '66%')
            btn_control.children('.progress_btn_again').css('display', 'none')
            btn_control.children('.progress_btn_cancel').css('display', 'none')
          } else {
            line_done.css('width', '100%')
          }
        }
      })
  })
})
