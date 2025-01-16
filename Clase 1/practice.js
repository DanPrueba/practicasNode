const { sum } = require('./sum')
const os = require('node:os')
const fs = require('node:fs')
const picolors = require('picocolors')


// Utilizando File System
let text = fs.readFileSync('./texto.txt', 'utf-8')
console.log(picolors.bgGreenBright(text))

console.log('Belos')

// funcion normal
console.log(sum(5,5));


//Utilizando OS
//console.log("Arquitectura del sistema: " + os.arch)
console.log("Nombre del sistema: " + os.hostname)
//console.log("Procesadores: " + os.cpus().length)
