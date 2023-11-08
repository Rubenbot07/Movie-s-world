const burguerMenu = document.querySelector('.bars__menu')
const searchIcon = document.querySelector('.search-icon')
const logo = document.querySelector('.logo')

burguerMenu.addEventListener('click', ()=> {
    const line1 = document.querySelector('.line1__bars-menu')
    const line2 = document.querySelector('.line2__bars-menu')
    const line3 = document.querySelector('.line3__bars-menu')
    const menu = document.querySelector('.menu')
    const bodyStatic = document.querySelector('body')

    line1.classList.toggle('activeline1__bars-menu')
    line2.classList.toggle('activeline2__bars-menu')
    line3.classList.toggle('activeline3__bars-menu')
    menu.classList.toggle('active-menu')
    bodyStatic.classList.toggle('static')
})

searchIcon.addEventListener('click', ()=> {
    const inputBar = document.querySelector('.input-bar')
    inputBar.classList.toggle('active-search-input')
    logo.classList.toggle('inactive')
})