const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res)=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if(req.url == '/'){
        res.statusCode = 200
        res.end('Bienvenido a mi Pagina Web nueva')
    }else if(req.url == '/contacto'){
        res.statusCode = 200
        res.end('Pagina de Contacto')
    }else if(req.url == '/imagen-bonita.png'){
    fs.readFile('/placa.png', (err,data)=>{
        if(err){
            res.statusCode = 500
            res.end('Error 505 internal server')
        }else{
            res.statusCode = 200
            res.setHeader('Content-Type', 'image/png')
            res.end(data)
        }
    })        

    }
    else{
        res.statusCode = 404
        res.end('404')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, ()=>{
    console.log(`server listening on port http://localhost:${desiredPort}`)
})