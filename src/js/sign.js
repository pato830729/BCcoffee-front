// $(document).ready(function () {
//   $('.dark_bg_signIp').hide()
//   $('.signUp_switch').on('click', function () {
//     $('.signIn_outline').css('background', '#a35e47')
//     $('#dark_bg').css('right', '50%')
//     $('.dark_bg_signUp').hide()
//     $('.dark_bg_signIp').fadeIn().show()
//   })
//   $('.signIp_switch').on('click', function () {
//     $('.signIn_outline').css('.background', '#fff')
//     $('#dark_bg').css('right', '0%')
//     $('.dark_bg_signUp').fadeIn().show()
//     $('.dark_bg_signIp').hide()
//   })
//   $('.signIn_out').on('click', function () {
//     history.back()
//   })
//   $('.signIn_btn').on('click', function () {
//     window.location.href = 'accont.html'
//   })
// })

export const registerSwitch = () =>{
    const darkBgsignIp = document.querySelector('.dark_bg_signIp')
    const darkBgsignUp = document.querySelector('.dark_bg_signUp')
    const darkBg = document.querySelector('#dark_bg')
    const signUpswitch = document.querySelector('.signUp_switch')
    const signIpswitch = document.querySelector('.signIp_switch')
    darkBgsignIp.style.display = 'none'
    signUpswitch.addEventListener('click', () => {
        darkBg.style.right = '50%'
        darkBgsignUp.style.display = 'none'
        darkBgsignIp.style.display = 'block'
      })
    signIpswitch.addEventListener('click', () => {
        darkBg.style.right = '0%'
        darkBgsignIp.style.display = 'none'
        darkBgsignUp.style.display = 'block'
    })
}
