const burguerMenu = document.querySelector('.bars__menu')
const logo = document.querySelector('.logo')
const categorieslist = document.querySelector('.categories-title')
const searchIcon = document.querySelector('.search-icon')
burguerMenu.addEventListener('click', ()=> {

    line1.classList.toggle('activeline1__bars-menu')
    line2.classList.toggle('activeline2__bars-menu')
    line3.classList.toggle('activeline3__bars-menu')
    menu.classList.toggle('active-menu')
    searchIcon.classList.toggle('inactive')
    
})

searchIcon.addEventListener('click', ()=> {
    const inputBar = document.querySelector('.input-bar')
    inputBar.classList.toggle('active-search-input')
    logo.classList.toggle('inactive')
    searchIcon.classList.toggle('search-icon')
    searchIcon.classList.toggle('active-search-icon')
    searchButton.classList.toggle('inactive')
    inputBar.value = '';
})


categorieslist.addEventListener('click', ()=> {
    const list = document.querySelector('.categories-list');
    const listElement = document.querySelectorAll('.list-item')
    list.classList.toggle('active-menu-ul')
    listElement.forEach(item => {
        item.classList.toggle('active-list-item')
    })
    const rightArrow = document.querySelector('.right-arrow')
    rightArrow.classList.toggle('active-right-arrow')
})

