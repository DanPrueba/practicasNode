const z = require('zod')

const schemaMovies = z.object({
        title : z.string(),
        year: z.number().int().min(1900).max(2024),
        director: z.string(),
        duration: z.number().int().positive(),
        genre: z.array(z.enum(['Accion', 'Guerra', 'Animacion', 'Drama']),
        {
            required_error: "Movie genre is required",
            invalid_type_error: "Debe ser un array de peliculas"
        })


})

    function validateMovie(object){
        return schemaMovies.safeParse(object)
    }

    function moviePartialValidate(object){
        return schemaMovies.partial.safeParse(object)
    }

    module.exports = {
        validateMovie
    }