const burguerMenu = document.querySelector('.bars__menu')
const logo = document.querySelector('.logo')
const searchIcon = document.querySelector('.search-icon')
const categoriesTitle = document.querySelector('.categories-title-span');
if(language === 'en-US') {
    categoriesTitle.innerText = 'Categories'
    favoritesButton.innerText = 'Favorites'
    languagesTitle.innerText = 'Languages'
} else {
    categoriesTitle.innerText = 'Categorías'
    favoritesButton.innerText = 'Favoritos'
    languagesTitle.innerText = 'Idiomas'
}


burguerMenu.addEventListener('click', ()=> {
    const listElement = document.querySelectorAll('.list-item')
    line1.classList.toggle('activeline1__bars-menu')
    line2.classList.toggle('activeline2__bars-menu')
    line3.classList.toggle('activeline3__bars-menu')
    menu.classList.toggle('active-menu')
    if (list.classList.contains('active-menu-ul')) {
        list.classList.remove('active-menu-ul')
        rightArrow.classList.remove('active-right-arrow')
        listElement.forEach(item => {
            item.classList.remove('active-list-item')
        })
    }
})
searchIcon.addEventListener('click', ()=> {
    const inputBar = document.querySelector('.input-bar')
    inputBar.classList.toggle('active-search-input')
    searchIcon.classList.toggle('search-icon')
    searchIcon.classList.toggle('active-search-icon')
    searchButton.classList.toggle('inactive')
    inputBar.value = '';
    if (window.innerWidth < 768) {
        logo.classList.toggle('inactive')
    }
    if(window.innerWidth > 768) {
        categorieslist.classList.toggle('inactive')
        favoritesButton.classList.toggle('inactive')
    }
})


categorieslist.addEventListener('click', ()=> {
    const listElement = document.querySelectorAll('.list-item')
    list.classList.toggle('active-menu-ul')
    listElement.forEach(item => {
        item.classList.toggle('active-list-item')
    })
    rightArrow.classList.toggle('active-right-arrow')
})

