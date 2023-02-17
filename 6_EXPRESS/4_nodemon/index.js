const express  = require('express')
const app      = express()
const port     = 3000

const path     = require('path')
const basepath = path.join(__dirname,'templates')

app.get('/', (req,res) => {
    //req uisição é o que o usuario manda (RECEBEMOS)
    //res posta é a resposta que enviamos (ENVIAMOS)
    res.sendFile(`${basepath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`) 
})