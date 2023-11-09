const burguerMenu = document.querySelector('.bars__menu')
const categorieslist = document.querySelector('.categories-title')
const searchIcon = document.querySelector('.search-icon')
const logo = document.querySelector('.logo')

burguerMenu.addEventListener('click', ()=> {
    const line1 = document.querySelector('.line1__bars-menu')
    const line2 = document.querySelector('.line2__bars-menu')
    const line3 = document.querySelector('.line3__bars-menu')
    const menu = document.querySelector('.menu')

    line1.classList.toggle('activeline1__bars-menu')
    line2.classList.toggle('activeline2__bars-menu')
    line3.classList.toggle('activeline3__bars-menu')
    menu.classList.toggle('active-menu')
    
})

searchIcon.addEventListener('click', ()=> {
    const inputBar = document.querySelector('.input-bar')
    inputBar.classList.toggle('active-search-input')
    logo.classList.toggle('inactive')
})

categorieslist.addEventListener('click', ()=> {
    const list = document.querySelector('.categories-list');
    const listElement = document.querySelectorAll('.list-item')
    list.classList.toggle('active-menu-ul')
    listElement.forEach(item => {
        item.classList.toggle('active-list-item')
    })
})