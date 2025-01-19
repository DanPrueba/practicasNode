/*const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const {validateMovie } = require('./schemas/movies')
const z = require('zod')

const app = express()
app.use(express.json()) //middleware

app.disable('x-powered-by')



app.get('/movies', (req,res)=>{
    res.status(200).json(movies)
})

//Filtrar por gnre
app.get('/movies', (req, res)=>{
    const { genre } = req.query;
    if(genre){
        const moviesFiltered = movies.filter(
            movie => movie.genre.some(g=>g.toLowerCase() == genre.toLowerCase())) 
            return res.json(moviesFiltered)
        } 
})

//Trae una pelicula por ID
app.get('/movies/:id', (req, res)=>{
    const { id } = req.params
    const movie = movies.find(movie=> movie.id == id)
    if(movie) return res.json(movie)

    res.status(404).json({message : "Movie not found"})
})

//POST - CON VALIDACIONES ZOD
app.post('/movies', (req, res)=>{

    const result = validateMovie(req.body)

    if(result.error){
        return res.status(404).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie) 

    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res)=>{

    const result = moviePartialValidate(req.body)
 
    
    const {id} = req.query
    const movieIndex = movies.findIndex(m=> m.id == id)
    if(movieIndex < 0) return res.status(404).json({message: "Movie not found"})
    
    const udpateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = udpateMovie

    return res.json(udpateMovie)


})



const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
} ) */

    const express = require('express')
    const crypto = require('node:crypto')
    const {validationMoviesPractice} = require('./schemas/moviesPractice')
    const movies = require('./movies.json')
    const app = express()
    app.use(express.json())

    app.get('/movies', (req, res)=>{
        res.json(movies)
    })

    app.post('/movies', (req,res)=>{
        const result = validationMoviesPractice(req.body)
        if(!result) return res.status(400).json(result.error)
    
        const newMovie = {
            "id" : crypto.randomUUID(),
            ...result.data
        }

        movies.push(newMovie)
        return res.status(201).json(movies)
    })

   app.patch('/movies/:id', (req,res)=>{
    const {id} = req.params
    const result = req.body

    const movieIndex = movies.findIndex(movie => movie.id == id)

    if(movieIndex == -1) return res.status(404).json({"error": "Movie not found"})

    const movieUpdated = {
        ...movies[movieIndex],
        ...result
    }

    movies[movieIndex] = movieUpdated

    return res.status(200).json(movies)
   }) 

   app.delete('/movies/:id', (req,res)=>{
    const {id} = req.params
    const movieIndex = movies.findIndex(movie=>movie.id == id)

    movies.splice(movieIndex,1)

    return res.status(203).json(movies)

   })


    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, ()=>{
        console.log(`Listening in https://localhost:${PORT}`)
    })
