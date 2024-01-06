// window.addEventListener('keydown', (e)=>{
//     console.log(e.key);
//     if(e.key === 'Enter') {
//         location.hash = `#search=${inputBar.value}`
//         searchPage()
//     }
// })
    
window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
console.log('hola navigation');
function navigator() {
    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
        searchPage();
    } else  if(location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    // scroll-top
    window.scrollTo(0, 0)
}

// View more
viewMoreTrends.addEventListener('click', ()=>  {
    location.hash = '#trends';
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
    location.hash = `#search=${inputBar.value.trim()}`
})

logo.addEventListener('click', homePage)


function homePage() {
    getTrendingMoviesPreview()
    getCategoriesPreview()
    categoriesSection()
    sliderContainer.classList.remove('inactive')
    genreSection.classList.remove('inactive')
    trendSection.classList.add('inactive')
    categoryView.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryViewLoading.classList.add('inactive')

}
function trendsPage() {
    console.log('Trends');
    getCategoriesPreview()
    sliderContainer.classList.add('inactive')
    getTrendingMovies()
    trendSection.classList.remove('inactive')
    genreSection.classList.add('inactive')
    categoryView.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')

}
function searchPage() {
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    trendSection.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryView.classList.remove('inactive')
    const query = decodeURI(location.hash.split("=")[1]);
    //decodeURI Sustituye a cada secuencia de escape codificado en URI con el carácter que representa.
    getCategoriesPreview()
    getMoviesBysearch(query)
}
function movieDetailsPage() {
    console.log('Movie');
    sliderContainer.classList.add('inactive')
    trendSection.classList.add('inactive')
    genreSection.classList.add('inactive')
    categoryView.classList.add('inactive')
    movieDetailsSection.classList.remove('inactive')
    relatedMoviesSection.classList.remove('inactive')
    const movieId = location.hash.split('=')[1];
    console.log(movieId);
    getMovieDetails(movieId);
}
function categoriesPage() {
    console.log('Categories');
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    trendSection.classList.add('inactive')
    movieDetailsSection.classList.add('inactive')
    categoryView.classList.remove('inactive')
    categoryViewLoading.classList.remove('inactive')
    getCategoriesPreview()
    const fullId = location.hash.split('-', (location.hash).length) // [#category=12, category.name]
    const categoryId = fullId[0].split('=', (fullId[0].length));  //  [#category=, 12]
    //console.log(categoryId[1]);  //[12]
    getCategoryView(categoryId[1])
}
