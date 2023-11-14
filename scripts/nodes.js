console.log('hola nodes');
const trendSection = document.querySelector('.trends-section')
const sliderContainer = document.querySelector('.slider-container')
const genreSection = document.querySelector('.genres-section')

//NAVBAR
const burguerMenu = document.querySelector('.bars__menu')
const categorieslist = document.querySelector('.categories-title')
const searchIcon = document.querySelector('.search-icon')
const logo = document.querySelector('.logo')
//BURGUER MENU
const line1 = document.querySelector('.line1__bars-menu')
const line2 = document.querySelector('.line2__bars-menu')
const line3 = document.querySelector('.line3__bars-menu')
// MENU
const menu = document.querySelector('.menu')
// SEARCH
const inputBar = document.querySelector('.input-bar')
const list = document.querySelector('.categories-list');
const listElement = document.querySelectorAll('.list-item')

// trend preview
const trendingPreviewMoviesContainer = document.querySelector('.swiper-wrapper') 
const movieContainer = document.createElement('div')
const movieImg = document.createElement('img')
const trendingMovieContainer = document.querySelector('.trending-movies-container')
        
// trend page
const trendMovieContainer = document.createElement('div')
const movieTitle = document.createElement('span')
const movieTitleText = document.createTextNode(movie.title)
const trendMovieImg  = document.createElement('img')

// Categories
const categoriesContainer = document.querySelector('.categories-list');
const listItem = document.createElement('li')
const itemText = document.createTextNode(category.name)
const genresMainContainer = document.querySelector('.genres-container')
const genresContainer = document.querySelector('.genres-list');
const  genreListItem = document.createElement('li');
const  genreTitleContainer  = document.createElement('h3')
const  genreTitle  =  document.createTextNode(category.name)
genreListItem.classList.add('genres-list-item');
const icon = document.createElement('img')
const moreButton = document.querySelector('.more-button')