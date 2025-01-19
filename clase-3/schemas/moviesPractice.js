const z = require('zod')

const moviesSchema = z.object({
    "title": z.string(),
    "year": z.number().int().min(1990).max(2024),
    "director": z.string(),
    "duration": z.number().int(),
    "genre": z.array(z.enum(["Animacion", "Drama", "Suspenso"]),{
        "invalid_type_error": "The genre is incorrect"     
    })
})

function validationMoviesPractice(object){
    return moviesSchema.safeParse(object)

}

module.exports = {
    validationMoviesPractice
}