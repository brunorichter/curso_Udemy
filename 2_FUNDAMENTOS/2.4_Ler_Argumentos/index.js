

const args = process.argv.slice(2)

console.log(args)

const nome = args[0].split('=')[1]
const idad = args[1].split('=')[1]



console.log(`O nome é ${nome} e ele tem ${idad} anos`)



// executar de dentro dessa pasta no terminal o arquivo com:

//   >node .\index.js nome=Bruno idade=38