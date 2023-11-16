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
viewMoreTrends.addEventListener('click', ()=>  {
    location.hash = '#trends';
})
backButton.addEventListener('click', ()=> {
    location.hash = 'home'
})
backFromCategoryView.addEventListener('click', ()=> {
    location.hash = 'home'
})

function homePage() {
    getTrendingMoviesPreview()
    getCategoriesPreview()
    categoriesSection()
    sliderContainer.classList.remove('inactive')
    genreSection.classList.remove('inactive')
    trendSection.classList.add('inactive')
    categoryView.classList.add('inactive')

}
function trendsPage() {
    console.log('Trends');
    getCategoriesPreview()
    sliderContainer.classList.add('inactive')
    getTrendingMovies()
    trendSection.classList.remove('inactive')
    genreSection.classList.add('inactive')
    categoryView.classList.add('inactive')

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
    sliderContainer.classList.add('inactive')
    genreSection.classList.add('inactive')
    trendSection.classList.add('inactive')
    categoryView.classList.remove('inactive')
    getCategoriesPreview()
    const fullId = location.hash.split('-', (location.hash).length) // [#category=12, category.name]
    const categoryId = fullId[0].split('=', (fullId[0].length));  //  [#category=, 12]
    //console.log(categoryId[1]);  //[12]
    getCategoryView(categoryId[1])
}
