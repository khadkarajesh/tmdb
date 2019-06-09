import config from './config'
let xmlHttpRequest = new XMLHttpRequest()
xmlHttpRequest.open('get', `https://api.themoviedb.org/3/movie/popular?api_key=${config.api_key}&language=en-US&page=1`)
xmlHttpRequest.responseType = 'json'
xmlHttpRequest.send()
xmlHttpRequest.onload = () => {
    console.log(`${xmlHttpRequest.response.results[1].title}`)
}

xmlHttpRequest.onerror = () => {
    console.log('error')
}

xmlHttpRequest.onprogress = (event) => {
    console.log(`${event.loaded} of ${event.total}`)
}