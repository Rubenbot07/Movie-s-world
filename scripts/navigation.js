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

}

function homePage() {
    getTrendingMoviesPreview()
    getCategoriesPreview()
    sliderContainer.classList.remove('inactive')
    genreSection.classList.remove('inactive')
    trendSection.classList.add('inactive')

}
function trendsPage() {
    console.log('Trends');
    getCategoriesPreview()
    sliderContainer.classList.add('inactive')
    getTrendingMovies()
    trendSection.classList.remove('inactive')
    genreSection.classList.add('inactive')

}
function searchPage() {
    console.log('Search');
    getCategoriesPreview()
}
function movieDetailsPage() {
    console.log('Movie');
    getCategoriesPreview()
}
function categoriesPage() {
    console.log('Categories');
    getCategoriesPreview()
}
