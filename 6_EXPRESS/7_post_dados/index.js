const express  = require('express')
const app      = express()
const port     = 3000

const path     = require('path')
const basepath = path.join(__dirname,'templates')

// ler o body

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)

app.get('/users/add',(req,res) => {
    
    res.sendFile(`${basepath}/userForm.html`)
})

app.post('/users/save',(req,res) => {
    console.log(req.body)

    const name = req.body.name
    const age  = req.body.age

    console.log(`O nome do usuario é ${name} e sua idade é ${age}`)
    res.sendFile(`${basepath}/userForm.html`)

})

app.get('/users/save',(req,res) => {
 //   console.log(`teste`)


})

app.get('/users/:id', (req,res) => {
    
    const id = req.params.id
    console.log(`Estamos usando o usuário ${id}`)
    res.sendFile(`${basepath}/users.html`)    
})

app.get('/', (req,res) => {
    //req uisição é o que o usuario manda (RECEBEMOS)
    //res posta é a resposta que enviamos (ENVIAMOS)
    res.sendFile(`${basepath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`) 
})