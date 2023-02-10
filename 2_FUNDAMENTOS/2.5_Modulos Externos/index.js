// desabilitar validação do SSL com >npm set strict-ssl false
// fonte: https://stackoverflow.com/questions/29141153/nodejs-npm-err-code-self-signed-cert-in-chain



const minimist = require('minimist')


const args = minimist(process.argv.slice(2))

// argumentos a serem capturados
const nome = args['nome']
const idade = args['idade']

console.log(`Meu nome é ${nome} e tenho ${idade} anos`)




//     > node .\index.js --nome=Bruno --idade=38