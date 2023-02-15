const fs = require('fs')

if(!fs.existsSync('./minhaPasta')){
    console.log(`Não existe`)
    console.log(`criando diretorio`)
    fs.mkdirSync('minhaPasta')
    console.log(`Pasta Criada com Sucesso`)
}
else{
    console.log(`Pasta já existe`)
}