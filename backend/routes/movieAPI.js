const router = require('express').Router()
const cheerio = require('cheerio');
const Nightmare = require('nightmare');

//models
const Theater = require('../models/theater.model')
const Movie = require('../models/movie.model')


/*=====  Test entries  ======*/
let theaters = ['AMC PACIFIC PLACE 11', 'MAJESTIC BAY THEATRE']
let dates = ['?date=2019-11-17']

let getMovieInfo = (theater, dates) => {
    let nightmare = Nightmare();
    nightmare
        .goto(`https://www.fandango.com/`)
        .type('.style-search', theater)
        .click('.fan-btn-style-go')
        .wait(3000)
        .evaluate(() => { return document.querySelector('.search-results').innerHTML })
        .then(function (html) {
            let $ = cheerio.load(html);
            let items = []
            $('.results-container').each((i, el) => {
                items.push($(el).attr('href'))
            })
            //will need a regex to search for link containing the theater
            //better yet, just have a list of known seattle movie theaters
            //store the times for the day in a server  
            // console.log(items)
            return nightmare
                //after searching for the theater get and getting the correct link from the search results 
                .goto(items[0] + dates)
                .wait()
                //the primary container holding movie information 
                .evaluate(() => { return document.querySelector('.fd-theater').innerHTML })
                .end()
                .then((html2) => {
                    let $ = cheerio.load(html2)

                    let moviesAndTimes = []

                    $('.fd-movie').each((i, el) => {
                        let item = {

                            //***add the poster as well***//

                            name: $(el).find('.fd-movie__title').find('a.dark').text(),
                            times: `${$(el).find('.showtime-btn').text()}`,
                            date: dates
                        }
                        //had to get the links seperatly as it would only return one link if called within the 'item' object
                        let found = []

                        $(el).find('.showtime-btn--available').each((j, jl) => {

                            found.push(($(jl).attr('href')))
                        })

                        item.links = found

                        moviesAndTimes.push(item)
                    })

                    let formattedMovies = movieTimesFix(moviesAndTimes)

                    formattedMovies.push({
                        theaterName: theater
                    })
                    console.log(formattedMovies)
                    // console.log(moviesAndTimes)
                })
        })
        .catch(error => {
            console.error('Search failed:', error)
        })
}
//this funciton will seperate and format the times pulled from fandango 
let movieTimesFix = movies => {
    movies.forEach(movie => {
        // grab the times and and insert commas next to the p and q so they stick around after split methods
        let newTimes = movie.times.replace(/p/gi, 'p,').replace(/a/gi, 'a,').split(',')
        //the end of the array always seems to be a blank value so get rid of it by changing the length of the array 
        newTimes.length = newTimes.length - 1
        // let splitTimes = movie.times.
        movie.times = newTimes
    });
    return movies
}
/*=============================================
=            Demo nightmare call             =
=============================================*/
// getMovieInfo(theaters, dates)

//write a function that searches each theater and then the provided dates
// theaters.forEach(theater => {
//     // getMovieInfo(theater, dates)
//     dates.forEach(date => {
//         getMovieInfo(theater, date)
//     })

// })

//add a theater to the db
router.route('/add_theater').post((req, res) => {
    const newTheater = { name: req.body.name }

    Theater.create(newTheater)
        .then(dbMovie => {
            res.json('New Theater Added!')
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
})

//add a movie to a theater 
// ex id: 5dcfa1641d1e395710a08745
router.route('/add_movie/:id').post((req, res) => {
    let theaterId = req.params.id

    let newMovie = {
        name: req.body.name,
        date: req.body.date,
        times: req.body.times,
        links: req.body.links
    }

    Movie.create(newMovie)
        .then(dbMovie => {
            return Theater.findOneAndUpdate({ _id: theaterId }, { $push: { movies: dbMovie._id } }, { new: true }).then(() => {
                res.json('Movie added!')
            })
        }).catch(err => {
            res.status(400).json('Error: ' + err)
        })
})

// Export routes for server.js to use.
module.exports = router;