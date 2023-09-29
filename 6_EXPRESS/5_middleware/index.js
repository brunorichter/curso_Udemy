const express  = require('express')
const app      = express()
const port     = 3000

const path     = require('path')
const basepath = path.join(__dirname,'templates')

const checkAuth = function(req,res,next){

    req.authStatus = true

    if(req.authStatus){
        console.log("Usuário está logado")
        next() // não deixar load infinito - Seguir proxima etapa
    }else {
        console.log("Por favor, faça o login!")
        next() // não deixar load infinito - redirecionar Login
    }

}

app.use(checkAuth)

app.get('/', (req,res) => {
    //req uisição é o que o usuario manda (RECEBEMOS)
    //res posta é a resposta que enviamos (ENVIAMOS)
    res.sendFile(`${basepath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`) 
})