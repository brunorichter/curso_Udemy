const fs = require('fs')

fs.rename("arquivo.txt","novoarquivo.txt", function(err){
    if(err){
        console.log("Erro")
        return
    }
    console.log("Arquivo renomeado!")

})