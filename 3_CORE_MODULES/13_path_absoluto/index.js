const path = require('path')

// path absoluto

console.log(path.resolve('text.txt'))

// formar path

const midFolder = "relatorios"
const filename = "bruno.csv"

const finalPath = path.join('/', 'arquivos' , midFolder , filename)

console.log(finalPath)