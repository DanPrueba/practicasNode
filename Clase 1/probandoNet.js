const net = require('node:net')

function findAvailablePort(desiredPort){
    return new Promise((res, rej)=>{
        const server = net.createServer()

        server.listen(desiredPort, ()=>{
            const { port } = server.address()
            server.close(()=>{
                res(port)
            })
        })
    })

    server.on('error', (err)=>{
        if(err.code == 'EADDRINUSE'){
            findAvailablePort(0).then(res(port))
        }else{
            rejects(err)
        }
    })
}

module.exports = { findAvailablePort }