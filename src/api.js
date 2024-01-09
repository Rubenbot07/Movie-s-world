const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8', 
    },
    params: {
        'api_key' : API_KEY,

    }
});
//Util
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry.target.setAttribute);
        if (entry.isIntersecting) {     
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url)
        }
    })
})



//search on mobile
window.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') {
        if(inputBar.value === ''){
            location.hash = location.hash
        } else {
            location.hash = `#search=${inputBar.value}`
        }
    }
})

// Reload
function searchSectionReload() {
    if(!location.hash.startsWith('#home')){
        location.hash  = 'home'
    }
}
// craeate category view and trending view
function createMovie(movies, container) {
    container.innerHTML = ''
    movies.forEach(movie => {
        // const categoryViewContainer  = document.querySelector('.category-view-movies-container');
        const categoryViewImgContainer = document.createElement('div')
        categoryViewImgContainer.classList.add('category-view-movies-image-container');
        container.appendChild(categoryViewImgContainer);
        const movieImg = document.createElement('img');
        categoryViewImgContainer.appendChild(movieImg);
        movieImg.setAttribute('data-img','https://image.tmdb.org/t/p/w300' + movie.poster_path)
        movieImg.setAttribute('alt', movie.title);

        lazyLoader.observe(movieImg)
        const movieTitle = document.createElement('span')
        const movieTitleText = document.createTextNode(movie.title)
        movieTitle.appendChild(movieTitleText)
        categoryViewImgContainer.appendChild(movieTitle)

        categoryViewImgContainer.addEventListener('click', ()=> {
            console.log(movie.id, movie.title);
            location.hash = '#movie='  + movie.id
            
        })
    })
}
//Trending movies

async function getTrendingMoviesPreview() {
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();
    const {data} = await api('trending/movie/day')
    const movies = data.results;
    const limit = movies.slice(0,9)
    console.log(movies);
    const sliderLoading = document.querySelector('.slider-loading')
    sliderLoading.style.display = 'none'
    limit.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('.swiper-wrapper') 

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('swiper-slide')
        
        const movieImg = document.createElement('img')
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300'+ movie.poster_path,)
        lazyLoader.observe(movieImg)
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer)
        movieContainer.addEventListener('click', ()=> {
            console.log(movie.id, movie.title);
            location.hash = '#movie=' + movie.id;
        })
    })
}
async function getTrendingMovies() {
    const { data } = await api('trending/movie/day')
    const movies = data.results;
    console.log(movies);
    createMovie(movies, trendingMovieContainer)
}

//Categories
async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
        // const categoriesContainer = document.querySelector('.categories-list');
        const listItem = document.createElement('li')
        listItem.classList.add('list-item')
        categoriesContainer.appendChild(listItem)
        const itemText = document.createTextNode(category.name)
        listItem.appendChild(itemText)
        listItem.classList.add('list-item')        
    })

}
function createCategories(categories, container){
    container.innerHTML = ''
    categories.forEach(category => {
        const  genreListItem = document.createElement('li');
        const  genreTitleContainer  = document.createElement('h3')
        const  genreTitle  =  document.createTextNode(category.name)
        genreListItem.classList.add('genres-list-item');
        genreListItem.addEventListener('click', ()=> {
            const categoryViewTitle = document.querySelector('.category-view-title')
            categoryViewTitle.innerHTML = category.name
            location.hash = (`#category=${category.id}-${category.name}`) 
        })
        container.appendChild(genreListItem)
        
        const icon = document.createElement('img')
        icon.classList.add('clapperboard')
        icon.setAttribute('src', '/icons/clapper-clapperboard-svgrepo-com.svg')
        icon.setAttribute('alt', 'clapperboard')
        genreListItem.appendChild(icon);
        genreTitleContainer.appendChild(genreTitle)
        genreListItem.appendChild(genreTitleContainer)
    })
}

async function categoriesSection() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, genresContainer)
    // genresContainer.innerHTML = ''
    // categories.forEach(category => {
    //     // const genresMainContainer = document.querySelector('.genres-container')
    //     // const genresContainer = document.querySelector('.genres-list');
    //     const  genreListItem = document.createElement('li');
    //     const  genreTitleContainer  = document.createElement('h3')
    //     const  genreTitle  =  document.createTextNode(category.name)
    //     genreListItem.classList.add('genres-list-item');
    //     genreListItem.addEventListener('click', ()=> {
    //         const categoryViewTitle = document.querySelector('.category-view-title')
    //         categoryViewTitle.innerHTML = category.name
    //         location.hash = (`#category=${category.id}-${category.name}`) 
    //     })
    //     genresContainer.appendChild(genreListItem)
        
    //     const icon = document.createElement('img')
    //     icon.classList.add('clapperboard')
    //     icon.setAttribute('src', '/icons/clapper-clapperboard-svgrepo-com.svg')
    //     icon.setAttribute('alt', 'clapperboard')
    //     genreListItem.appendChild(icon);
    //     genreTitleContainer.appendChild(genreTitle)
    //     genreListItem.appendChild(genreTitleContainer)
          
    // })
}

// View more button
const moreButton = document.querySelector('.more-button')
    moreButton.addEventListener('click', ()=> {
    genresMainContainer.classList.toggle('active-genres-main-container')
    moreButton.classList.toggle('active-more-button')
})

//category view
async function getCategoryView(id){
    console.log('discover/movie?with_genres=' + id);
    const { data } = await api('discover/movie?with_genres=' + id)
    const movies = data.results;
    console.log(movies);
    categoryViewContainer.innerHTML = ''
    createMovie(movies, categoryViewContainer)
    categoryViewLoading.style.display = 'none'
}

async function getMoviesBysearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    })
    const movies = data.results;
    console.log(movies);
    const title = document.querySelector('.category-view-title')
    title.innerHTML  = ''
    title.innerHTML = inputBar.value
    console.log(`category view  ${categoryViewContainer}`);
    createMovie(movies, categoryViewContainer)
}
async function getMovieDetails(movieId) {
    const { data: movie } = await api('movie/' + movieId)
    console.log(movie);
    movieDetailsImg.innerHTML = ''
    movieDetailsImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path)
    movieDetailsImg.setAttribute('alt', movie.title);
    movieDetailstitle.textContent = movie.title
    movieScore.textContent = (movie.vote_average.toFixed(1)) + '⭐';
    movieDetailsDescription.innerText =  movie.overview;
    lang.innerText = `Original language: ${(movie.original_language).toUpperCase()}`
    date.innerText = `Release date: ${movie.release_date}`
    runTime.innerText = `Runtime: ${movie.runtime} min`
    movieDetailsImgLoading.style.display = 'none'
    movieInfoLoading.style.display = 'none'
    createCategories(movie.genres, movieGenres)
    getRelatedMovies(movieId)
    getTrailer(movieId)
}

async function getRelatedMovies(id) {
    const { data } = await api(`movie/${id}/similar`)
    const relatedMovies = data.results
    const limit = relatedMovies.slice(0, 6)
    console.log(limit);
    relatedMoviesContainerLoading.style.display = 'none';
    createMovie(limit, relatedMoviesContainer);
}

async function getTrailer(id) {
    const { data } = await api(`movie/${id}/videos`)
    trailer.innerHTML = ''
    const trailerVideo = data.results
    const teaser = trailerVideo[(trailerVideo.length - 1)]
    trailer.innerHTML = `<h3>Watch trailer</h3> <iframe width="560" height="315" src="https://www.youtube.com/embed/${teaser.key}?si=A5LZaUd_qmZofKdR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    trailerLoading.style.display = 'none'
}


