const fs = require('fs')

fs.stat('novoarquivo.txt', (err, stats) => {
        if (err) {
            console.log("ERRO")
            return
        }
        console.log(`É um  arquivo : %s`,stats.isFile())
        console.log(`É um diretorio: %s`,stats.isDirectory())
        console.log(`É um simbolico: %s`,stats.isSymbolicLink())
        console.log(stats.ctime)
        console.log(stats.size)
    })