// window.addEventListener('keydown', (e)=>{
//     console.log(e.key);
//     if(e.key === 'Enter') {
//         location.hash = `#search=${inputBar.value}`
//         searchPage()
//     }
// })
let infiniteScroll;
window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', infiniteScroll, false)

topButton.addEventListener('click',()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
})

function backTopButton() {

    if(document.documentElement.scrollTop < 400) {
        topButton.classList.add('inactive')
    } else {
        topButton.classList.remove('inactive')
    }
}
function navigator() {
    console.log('navigator');
    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {pasive : 
            false})
        infiniteScroll = undefined;
    }

    if(location.hash.startsWith('#trends')) {
        categoriesPage();
    } else if(location.hash.startsWith('#search=')) {
        searchPage();
    } else  if(location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();

    } else if (location.hash.startsWith('#favorites')){
        favoritesPage()
    }
    else {
        homePage();
    }

    // scroll-top
    window.scrollTo(0, 0)
    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {pasive : 
            false})
    }
}

// View more
viewMoreTrends.addEventListener('click', ()=>  {
    location.hash = '#trends';
    categoryViewTitle.innerHTML = ''
    categoryViewTitle.innerHTML = 'Trends'

})
// Back
// backButton.addEventListener('click', ()=> {
//     location.hash = window.history.back();
// })
backButton.forEach(button => {
    button.addEventListener('click', ()=> {
        location.hash = window.history.back();
        trailer.innerHTML = '';
    })
})

// Search 
searchButton.addEventListener('click', ()=> {
    if (inputBar.value.length > 0) {
        location.hash = `#search=${inputBar.value.trim()}`
    }
})

logo.addEventListener('click', ()=> {
    location.hash = '#home';
    topButton.classList.add('inactive')
    menu.classList.remove('active-menu')
    line1.classList.remove('activeline1__bars-menu')
    line2.classList.remove('activeline2__bars-menu')
    line3.classList.remove('activeline3__bars-menu')
    homePage()
})
favoritesButton.addEventListener('click', ()=> {
    location.hash = '#favorites'
})

function homePage() {
    getTrendingMoviesPreview()
    getCategoriesPreview()
    categoriesSection()
    sliderContainer.classList.remove('inactive')
    genreSection.classList.remove('inactive')
    categoryView.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryViewLoading.classList.add('inactive')
    likeSection.classList.add('inactive')
    window.removeEventListener('scroll', backTopButton, 
    {
        pasive : false
    }
    )
    topButton.classList.add('inactive')

}
function searchPage() {
    window.addEventListener('scroll', backTopButton, false)
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryView.classList.remove('inactive')
    const query = decodeURI(location.hash.split("=")[1]);
    //decodeURI Sustituye a cada secuencia de escape codificado en URI con el carácter que representa.
    getCategoriesPreview()
    getMoviesBysearch(query)
    infiniteScroll = getPaginatedBySearch(query)
}
function movieDetailsPage() {
    window.addEventListener('scroll', backTopButton, false)
    console.log('Movie');
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    categoryView.classList.add('inactive')
    movieDetailsSection.classList.remove('inactive')
    relatedMoviesSection.classList.remove('inactive')
    likeSection.classList.add('inactive')
    const movieId = location.hash.split('=')[1];
    console.log(movieId);
    getMovieDetails(movieId);
}
function categoriesPage() {
    window.addEventListener('scroll', backTopButton, false)
    console.log('Categories');
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryView.classList.remove('inactive')
    categoryViewLoading.classList.remove('inactive')
    getCategoriesPreview()
    const fullId = location.hash.split('-', (location.hash).length) // [#category=12, category.name]
    const categoryId = fullId[0].split('=', (fullId[0].length));  //  [#category=, 12]
    //console.log(categoryId[1]);  //[12]
    getCategoryView(categoryId[1])
    infiniteScroll = getPaginatedCaterorieView(categoryId[1])
} 

function favoritesPage() {
    window.addEventListener('scroll', backTopButton, false)
    likeSection.classList.remove('inactive')
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryView.classList.add('inactive')
    menu.classList.remove('active-menu')

    line1.classList.remove('activeline1__bars-menu')
    line2.classList.remove('activeline2__bars-menu')
    line3.classList.remove('activeline3__bars-menu')

 
    if (window.innerWidth < 768) {
        searchIcon.classList.toggle('inactive')
    }
    getFavorites()
}