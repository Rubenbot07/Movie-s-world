const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8', 
    },
    params: {
        'api_key' : API_KEY,
    }
});

//Trending movies

async function getTrendingMoviesPreview() {
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();
    const {data} = await api('trending/movie/day')
    const movies = data.results;
    const limit = movies.slice(0,9)
    console.log(movies);

    limit.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('.swiper-wrapper') 

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('swiper-slide')

        const movieImg = document.createElement('img')
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'+ movie.poster_path,)
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    })
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day')
    const movies = data.results;
    console.log(movies);
    movies.forEach(movie =>{
        const trendingMovieContainer = document.querySelector('.trending-movies-container')
        const trendMovieContainer = document.createElement('div')
        const movieTitle = document.createElement('span')
        const movieTitleText = document.createTextNode(movie.title)
        movieTitle.appendChild(movieTitleText)
        trendMovieContainer.classList.add('img-container')
        const trendMovieImg  = document.createElement('img')
        trendMovieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'+ movie.poster_path)
        trendingMovieContainer.appendChild(trendMovieContainer)
        trendMovieContainer.appendChild(trendMovieImg)
        trendMovieContainer.appendChild(movieTitle)
    })
}


async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach(category => {
        const categoriesContainer = document.querySelector('.categories-list');
        const listItem = document.createElement('li')
        listItem.classList.add('list-item')
        categoriesContainer.appendChild(listItem)
        const itemText = document.createTextNode(category.name)
        listItem.appendChild(itemText)
        listItem.classList.add('list-item')        
    })

}

async function categoriesSection() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach(category => {
        const genresMainContainer = document.querySelector('.genres-container')
        const genresContainer = document.querySelector('.genres-list');
        const  genreListItem = document.createElement('li');
        const  genreTitleContainer  = document.createElement('h3')
        const  genreTitle  =  document.createTextNode(category.name)
        genreListItem.classList.add('genres-list-item');
        genresContainer.appendChild(genreListItem)
        
        const icon = document.createElement('img')
        icon.classList.add('clapperboard')
        icon.setAttribute('src', '/icons/clapper-clapperboard-svgrepo-com.svg')
        genreListItem.appendChild(icon);
        genreTitleContainer.appendChild(genreTitle)
        genreListItem.appendChild(genreTitleContainer)
        
        const moreButton = document.querySelector('.more-button')
        moreButton.addEventListener('click', ()=> {
            genresMainContainer.classList.toggle('active-genres-main-container')
            moreButton.classList.toggle('active-more-button')
        })  
    })
}
categoriesSection()