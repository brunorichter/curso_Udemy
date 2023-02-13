const fs = require('fs')


fs.unlink('arquivo.txt',function(err,data){

    if(err){
        console.log(`Arquivo não existe`)
        return
    }
    console.log(`Arquivo removido`)

})