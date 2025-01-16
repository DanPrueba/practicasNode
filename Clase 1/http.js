const http = require('node:http')
const {findAvailablePort} = require('./probandoNet.js')

const server = http.createServer((req, res) =>{
    console.log('Request received')
    res.end('hola mundo')
})

findAvailablePort(100).then(port =>{
    server.listen(port, ()=>{
        console.log(`server listening on port http://localhost:${port}`)
    })
})

//server.listen(1234, ()=>{
//    console.log('server listening on port 1234')
//})