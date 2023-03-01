// // 選單link抓取當前網頁--------------------------------------------------------------
// const humurl = () => {
//   const url = location.pathname.split('/')[1]
//   const linkbtns = document.getElementsByClassName('hum_link')
//   // console.log(link_btns)
//   for (let i = 0; i < linkbtns.length; i++) {
//     const hrefURL = linkbtns[i].href.split('/')[3]
//     if (hrefURL === url) {
//       linkbtns[i].classList.add('active')
//     } else {
//       linkbtns[i].classList.remove('active')
//     }
//   }
// }
// humurl()

// // hamburger----------------------------------------------------------------
// const hamburgerbtn = document.querySelector('.hamburger_btn')
// const hamburger = document.querySelector('.hamburger')

// hamburgerbtn.addEventListener('click', () => {
//   hamburger.classList.toggle('change')
// })

export const initMenu = () => {
  const humurl = () => {
    const url = location.pathname.split('/')[1]
    const linkbtns = document.getElementsByClassName('hum_link')
    // console.log(link_btns)
    for (let i = 0; i < linkbtns.length; i++) {
      const hrefURL = linkbtns[i].href.split('/')[3]
      if (hrefURL === url) {
        linkbtns[i].classList.add('active')
      } else {
        linkbtns[i].classList.remove('active')
      }
    }
  }
  humurl()

  const hamburgerbtn = document.querySelector('.hamburger_btn')
  const hamburger = document.querySelector('.hamburger')

  hamburgerbtn.addEventListener('click', () => {
    hamburger.classList.toggle('change')
  })
}
