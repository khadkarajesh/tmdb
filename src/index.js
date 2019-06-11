// import config from './config'
// import './styles/app.css'

let xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.open('get', `https://api.themoviedb.org/3/movie/popular?api_key=your_key&language=en-US&page=1`)
xmlHttpRequest.responseType = 'json'
xmlHttpRequest.send()
xmlHttpRequest.onload = () => {
    const movieContainer = document.querySelector('.movie-container')
    xmlHttpRequest.response.results.forEach(element => {
        populateData(element, movieContainer)
    });
}

xmlHttpRequest.onerror = () => {
    console.log('error')
}

xmlHttpRequest.onprogress = (event) => {
    console.log(`${event.loaded} of ${event.total}`)
}

function populateData(movie, movieContainer) {
    const movieItem = document.createElement('div')

    movieItem.classList.add('movie-item')
    movieContainer.appendChild(movieItem)

  
    movieItem.appendChild(getBanner(movie))

    const descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('movie-description-container')

    const titleContainer = document.createElement('div')
    titleContainer.classList.add('movie-title-container')

    titleContainer.appendChild(getProgress(movie.vote_average))
    descriptionContainer.appendChild(titleContainer)

   
    titleContainer.appendChild(getDateTitle(movie))
    descriptionContainer.appendChild(getDescription(movie))

    movieItem.appendChild(descriptionContainer)
}

function getBanner(movie){
    const banner = document.createElement('img')
    banner.src = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.backdrop_path}`
    banner.classList.add('movie-banner')
    return banner
}

function getDescription(movie){
    const description = document.createElement('p')
    description.classList.add('movie-description')
    description.textContent = movie.overview
    return description
}

function getDateTitle(movie){
    const date_title_wrapper = document.createElement('div')
    date_title_wrapper.style.flexDirection = 'column'
    date_title_wrapper.style.marginLeft = '8px'

    const title = document.createElement('p')
    title.classList.add('movie-title')
    title.textContent = movie.title

    const releaseDate = document.createElement('p')
    releaseDate.textContent = movie.release_date

    date_title_wrapper.appendChild(title)
    date_title_wrapper.appendChild(releaseDate)
    return date_title_wrapper
}

function getProgress(rating) {
    var ratingPercentage = (rating / 10) * 100 
    console.log(ratingPercentage)
    const divContainer = document.createElement('div')
    divContainer.classList.add('circle', 'x-small','rating')
    divContainer.setAttribute('style', '--color:#a8a8a8')
    divContainer.setAttribute('data-fill', '40')

    const subDivContainer = document.createElement('div')
    subDivContainer.classList.add('circle', 'x-small')
    subDivContainer.setAttribute('data-fill', `${ratingPercentage}`)
    subDivContainer.setAttribute('style', '--color:#d2d531')


    const span = document.createElement('span')
    span.textContent = Math.floor(ratingPercentage) + '%'

    const bar = document.createElement('div')
    bar.classList.add('bar')

    subDivContainer.appendChild(span)
    subDivContainer.appendChild(bar)

    divContainer.appendChild(subDivContainer)

    return divContainer
}