const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const desiredPort = process.env.PORT ?? 1234



const processRequest = (req, res)=>{
    const {method, url} = req

    if(method == 'GET'){
        if(url == '/pokemon/ditto'){
            res.statusCode = 200
            res.setHeader('ContentType', 'application/json')
            res.end(JSON.stringify(dittoJSON))
        }else{
        res.statusCode = 404
        res.setHeader('ContentType', 'text/plain; charset=utf-8')
        res.end('Error 404 - Pagina no encontrada')
    }
}else if(method == "POST"){
    if(url == '/pokemon'){
        let body = ''

        //escuchar el evento data
        req.on('data', chunk=>{
            body += chunk.toString()
        })

        req.on('end', ()=>{
            const data = JSON.parse(body)
            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(data))
        })


    }else{
        res.statusCode = 404
        res.end('Error 404 - Pagina no encontrada')
    }
}
}

const server = http.createServer(processRequest)

server.listen(desiredPort, ()=>{
    console.log(`server listening on port http://localhost:${desiredPort}`)
})



