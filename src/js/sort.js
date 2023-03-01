// // 抓取每分類的寬度
// const sortitems = document.querySelectorAll('.sort_item')
// const sortlineFocus = document.querySelector('.sort_lineFocus')
// for (const [index, item] of sortitems.entries()) {
//   const sortwidth = 100 / sortitems.length
//   item.style.width = `${sortwidth}%`
//   // 滑軌長度
//   sortlineFocus.style.width = `${sortwidth}%`
//   // 初始分類要為重點色
//   $('.sort_item').eq(0).css('color', '#fc9f4d')
//   // 點擊事件
//   $('.sort_item').on('click', function () {
//     $(this).css('color', '#fc9f4d')
//     $(this).siblings().css('color', '#a35e47')
//   })
//   item.addEventListener('click', () => {
//     sortlineFocus.style.transition = 'all .5s ease'
//     sortlineFocus.style.left = `${sortwidth * index}%`
//   })
// }

export const sort = () => {
  // 抓取每分類的寬度
  const sortitems = document.querySelectorAll('.sort_item')
  const sortlineFocus = document.querySelector('.sort_lineFocus')
  const sortwidth = 100 / sortitems.length

  for (let i = 0; i < sortitems.length; i++) {
    sortitems[0].style.color = '#fc9f4d'
    sortitems[i].style.width = `${sortwidth}%`
    sortitems[i].addEventListener('click', () => {
      sortlineFocus.style.transition = 'all .5s ease'
      sortlineFocus.style.left = `${sortwidth * i}%`
      sortitems[i].style.color = '#fc9f4d'
      const siblings = Array.from(sortitems).filter(c => c !== sortitems[i])
      for (let j = 0; j < siblings.length; j++) {
        siblings[j].style.color = '#a35e47'
      }
    })
  }
  sortlineFocus.style.width = `${sortwidth}%`
}

export default sort
