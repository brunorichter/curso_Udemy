// desabilitar validação do SSL com >npm set strict-ssl false
// fonte: https://stackoverflow.com/questions/29141153/nodejs-npm-err-code-self-signed-cert-in-chain

const soma = require('./soma').soma

const minimist = require('minimist')


const args = minimist(process.argv.slice(2))

// argumentos a serem capturados
const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a,b)


//     > node .\index.js --nome=Bruno --idade=38