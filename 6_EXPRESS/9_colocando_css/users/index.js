const express = require('express')
const router = express.Router()

const path     = require('path')
const basepath = path.join(__dirname,'../templates')

// ler o body

router.use(
    express.urlencoded({
        extended: true
    })
)

router.use(
    express.json()
)

router.get('/add',(req,res) => {
    
    res.sendFile(`${basepath}/userForm.html`)
})

router.post('/save',(req,res) => {
    console.log(req.body)

    const name = req.body.name
    const age  = req.body.age

    console.log(`O nome do usuario é ${name} e sua idade é ${age}`)
    res.sendFile(`${basepath}/userForm.html`)

})

router.get('/save',(req,res) => {
 //   console.log(`teste`)


})

router.get('/:id', (req,res) => {
    
    const id = req.params.id
    console.log(`Estamos usando o usuário ${id}`)
    res.sendFile(`${basepath}/users.html`)    
})

module.exports = router