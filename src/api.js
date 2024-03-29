//Data

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8', 
    },
    params: {
        'api_key' : API_KEY,
    },
    languages: {
        es: 'es',
    //     'es': es,
    }
});


// local storage section
function likedMoviesList(id) {
    const item = JSON.parse(localStorage.getItem(`${id}`))
    let movies;
    if(item) {
        movies = item;
    } else {
        movies = {};
    }
    return movies
}

function likeMovie (movie) {
    const likedMovies = likedMoviesList(movie.id);
    if (likedMovies[movie.id]) {
        localStorage.removeItem(movie.id)
    } else {
        likedMovies[movie.id] = movie
        localStorage.setItem(`${movie.id}`, JSON.stringify(likedMovies))
    }
}


//Utils
let page = 1;
let maxPage;
let language = 'en-US'
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry.target.setAttribute);
        if (entry.isIntersecting) {     
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url)
        }
    })
})

//remove-menu

function removeMenu() {
    menu.classList.remove('active-menu')
    line1.classList.remove('activeline1__bars-menu')
    line2.classList.remove('activeline2__bars-menu')
    line3.classList.remove('activeline3__bars-menu')
}

//like button 
function likeActions(container, movie) {
    const likeButton = document.createElement('button')
    const likeButtonIcon = document.createElement('img')
    likeButtonIcon.setAttribute('src', '/icons/like-icon.svg')
    likeButtonIcon.setAttribute('alt', 'Yellow heart icon')
    likeButtonIcon.classList.add('like-icon-img')
    likeButton.classList.add('like-button')
    likeButton.appendChild(likeButtonIcon )
    container.appendChild(likeButton)

    likeButton.addEventListener('click', (event)=> {
        event.stopPropagation();
        likeButton.classList.toggle('liked')
        likeButtonIcon.classList.toggle('like-icon-img')
        likeMovie(movie)
    })
    if (localStorage.getItem(`${movie.id}`)) {
        likeButton.classList.add('liked')
        likeButtonIcon.classList.remove('like-icon-img')
    }
}

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
function createMovie(movies, container, {clean = true} = {},) {
    
    if(clean) {
        container.innerHTML = ''
    }

    movies.forEach(movie => {
        // const categoryViewContainer  = document.querySelector('.category-view-movies-container');
        const categoryViewImgContainer = document.createElement('div')
        categoryViewImgContainer.classList.add('category-view-movies-image-container');
        container.appendChild(categoryViewImgContainer);
        
        const movieImg = document.createElement('img');
        categoryViewImgContainer.appendChild(movieImg);
        movieImg.setAttribute('data-img','https://image.tmdb.org/t/p/w300' + movie.poster_path)
        movieImg.setAttribute('alt', movie.title);
        movieImg.classList.add('min-img')
        lazyLoader.observe(movieImg)
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://i.postimg.cc/dQ2r7BpF/error-image-photo-icon.png')
            movieImg.setAttribute('alt', 'Movie not found image')
        })
        
        
        const movieTitle = document.createElement('span')
        const movieTitleText = document.createTextNode(movie.title)
        likeActions(categoryViewImgContainer, movie)
        movieTitle.appendChild(movieTitleText)
        categoryViewImgContainer.appendChild(movieTitle)
        categoryViewImgContainer.addEventListener('click', ()=> {
            location.hash = '#movie='  + movie.id
            
        })

    })
}
//Trending movies

async function getTrendingMoviesPreview() {
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();
    const {data} = await api('trending/movie/day', {
        params : {
            language
        }
    })
    const movies = data.results;
    const limit = movies.slice(0,9)
    const trendsTitleContainer = document.querySelector('.trending-title')
    trendsTitleContainer.innerHTML = '';
    const trendsTitle = document.createElement('h2')
    trendsTitleContainer.appendChild(trendsTitle);
    trendsTitle.innerHTML = '';
    if(language == 'en-US') {
        trendsTitle.innerText = 'Trends'
        viewMoreTrends.innerText = 'View more' 
    } else {
        trendsTitle.innerText = 'Tendencias';
        viewMoreTrends.innerText = 'Ver más'
    }
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
            location.hash = '#movie=' + movie.id;
        })
    })
}


function getPaginatedTrendingMovies() {
    return async function () {
        const {
            scrollTop, scrollHeight, clientHeight
        } = document.documentElement    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 80)
        // el codigo anterior es igual que usar 
        // document.documentElement.scrollTop etc 
        const pageIsNotMax = page < maxPage;
        
        if(scrollIsBottom && pageIsNotMax) {
            const { data } = await api('trending/movie/day', {
                params : {
                    page : ++page,
                    language
                }
            })
            const movies = data.results;
            createMovie(movies, trendingMovieContainer,{clean: false})
        }
    }    
   
}

//Categories of the home page
async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list', {
        params : {
            language
        }
    });
    const categories = data.genres;
    categoriesContainer.innerHTML = '';
    const categoriesGenresTitle = document.querySelector('.genres-title');
    (language == 'en-US') 
    ? categoriesGenresTitle.innerText = 'Categories'
    : categoriesGenresTitle.innerText = 'Categorías';
    categories.forEach(category => {
        const categoriesContainer = document.querySelector('.categories-list');
        const listItem = document.createElement('li')
        listItem.classList.add('list-item')
        categoriesContainer.appendChild(listItem)
        const itemText = document.createTextNode(category.name)
        listItem.appendChild(itemText)
        listItem.addEventListener('click', ()=> {
            const categoryViewTitle = document.querySelector('.category-view-title')
            categoryViewTitle.innerHTML = category.name
            location.hash = (`#category=${category.id}-${category.name}`)
            likeContainer.classList.add('inactive')
            listItem.classList.toggle('active-list-item')
            list.classList.toggle('active-menu-ul')
            rightArrow.classList.toggle('active-right-arrow')
            removeMenu()
        })
    })

}

// create categories of the nav
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
    const { data } = await api('genre/movie/list', {
        params: {
            language
        }
    });
    const categories = data.genres;
    createCategories(categories, genresContainer)

}
// View more button
const moreButton = document.querySelector('.more-button')
moreButton.addEventListener('click', ()=> {
    genresMainContainer.classList.toggle('active-genres-main-container')
    moreButton.classList.toggle('active-more-button')
})


//category view

async function getCategoryView(id){
    const { data } = await api('discover/movie?with_genres='+ id, {
        params : {
            language
        }
    })
    const movies = data.results;
    categoryViewContainer.innerHTML = ''
    maxPage = data.total_pages;
    createMovie(movies, categoryViewContainer,{clean: true})
    categoryViewLoading.style.display = 'none'
}
function getPaginatedCaterorieView(id) {
    return async function () {
        const {
            scrollTop, scrollHeight, clientHeight
        } = document.documentElement    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 80 )
        // el codigo anterior es igual que usar 
        // document.documentElement.scrollTop etc 
        const pageIsNotMax = page < maxPage;
        
        if(scrollIsBottom && pageIsNotMax) {
            const { data } = await api('discover/movie?with_genres='+ id, {
                params : {
                    page : ++page, 
                    language
                }
            })
            const movies = data.results;
            createMovie(movies, categoryViewContainer,{clean: false})
        }
    }    
        
   
}
async function getMoviesBysearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
            language
        }
    })
    const movies = data.results;
    const title = document.querySelector('.category-view-title')
    title.innerHTML  = ''
    title.innerHTML = inputBar.value
    maxPage = data.total_pages;
    createMovie(movies, categoryViewContainer)
}
function getPaginatedBySearch(query) {
    return async function () {
        const {
            scrollTop, scrollHeight, clientHeight
        } = document.documentElement    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 80 )
        // el codigo anterior es igual que usar 
        // document.documentElement.scrollTop etc 
        const pageIsNotMax = page < maxPage;
    
        if(scrollIsBottom && pageIsNotMax) {
            const { data } = await api('search/movie', {
                params : {
                    query,
                    page : ++page,
                    language
                }
            })
            const movies = data.results;
            createMovie(movies, categoryViewContainer,{clean: false})
        }
    }    
   
}
async function getMovieDetails(movieId) {
    const { data: movie } = await api('movie/' + movieId, {
        params : {
            language
        }
    })
    movieDetailsImg.innerHTML = ''
    movieDetailsImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path)
    movieDetailsImg.setAttribute('alt', movie.title);
    movieDetailsImg.addEventListener('error', () => {
        movieDetailsImg.setAttribute('src', 'https://i.postimg.cc/C5bLmDtW/default-image.png')
        movieDetailsImg.setAttribute('alt', 'Movie not found image')
    })
    movieDetailstitle.textContent = movie.title
    movieScore.textContent = (movie.vote_average.toFixed(1)) + '⭐';
    movieDetailsDescription.innerText =  movie.overview;
    let originalLanguage = "Original language";
    let releaseDate = 'Release date';
    let time = 'Runtime'
    if(language !== 'en-US') {
        originalLanguage = 'Idioma original';
        releaseDate = 'Lanzamiento';
        time = 'Duración'
    } 
    likeActions(movieDetailsContainer, movie)
    lang.innerText = `${originalLanguage}: ${(movie.original_language).toUpperCase()}`
    date.innerText = `${releaseDate}: ${movie.release_date}`
    runTime.innerText = `${time}: ${movie.runtime} min`
    movieDetailsImgLoading.style.display = 'none'
    movieInfoLoading.style.display = 'none'
    createCategories(movie.genres, movieGenres)
    getRelatedMovies(movieId)
    getTrailer(movieId)
}

async function getRelatedMovies(id) {
    const { data } = await api(`movie/${id}/similar`, {
        params : {
            language
        }
    })
    const relatedMovies = data.results
    const limit = relatedMovies.slice(0, 6)
    relatedMoviesContainerLoading.style.display = 'none';
    const relatedMoviesTitle = document.querySelector('.related-movies-title');
    (language === 'en-US') 
    ? relatedMoviesTitle.innerText = 'Related movies' 
    : relatedMoviesTitle.innerText = 'Películas relacionadas'
    createMovie(limit, relatedMoviesContainer);
}

async function getTrailer(id) {
    const { data } = await api(`movie/${id}/videos`, {
        params : {
            language
        }
    })
    trailer.innerHTML = ''
    let trailertitle = 'Watch trailer';
    (language !== 'en-US') ? trailertitle = 'Ver trailer': '';
    const trailerVideo = data.results
    const teaser = trailerVideo[(trailerVideo.length - 1)]
    trailer.innerHTML = `<h3>${trailertitle}</h3> <iframe width="560" height="315" src="https://www.youtube.com/embed/${teaser.key}?si=A5LZaUd_qmZofKdR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    trailerLoading.style.display = 'none'
}

function getFavorites() {
    likeContainer.innerHTML = ''
    const favorites = []
    if(localStorage.length > 0 ) {
        for(let i = 0; i < localStorage.length; i++) {
            const favoritesMovieContainer = document.createElement('div')
            favoritesMovieContainer.classList.add('liked-movies-image-container')
            likeContainer.appendChild(favoritesMovieContainer)
            const key = localStorage.key(i)
            const value = localStorage.getItem(key)
            favorites.push(JSON.parse(value))
            const movieImg = document.createElement('img')
            movieImg.classList.add('min-img')
            movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${favorites[i][key].poster_path}`) 
            favoritesMovieContainer.appendChild(movieImg)
            const movieTitle = document.createElement('span')
            const movieTitleText = document.createTextNode(`${favorites[i][key].title}`)
            movieTitle.appendChild(movieTitleText)
            favoritesMovieContainer.appendChild(movieTitle)
            const likeButton = document.createElement('button')
            const likeButtonIcon = document.createElement('img')
            likeButtonIcon.setAttribute('src', '/icons/like-icon.svg')
            likeButtonIcon.setAttribute('alt', 'Yellow heart icon')
            likeButton.classList.add('like-button')
            likeButton.classList.add('liked')
            likeButton.appendChild(likeButtonIcon )
            favoritesMovieContainer.appendChild(likeButton)
            favoritesMovieContainer.addEventListener('click', ()=> {
                location.hash = '#movie='  + favorites[i][key].id
                
            })
            likeButton.addEventListener('click', (event)=> {
                event.stopPropagation();
                likeButton.classList.toggle('liked')
                likeButtonIcon.classList.toggle('like-icon-img')
                likeMovie(favorites[i][key])

                getFavorites()
            })
        }
    }   
}