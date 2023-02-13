const http = require('http')
const urlInfo = require('url').parse(req.url,true)


const port = 3000

const server = http.createServer((req , res) => {
    const urlInfo = require('url').parse(req.url,true)
    const name = urlInfo.query.name
    
    res.statusCode = 200
    res.setHeader('Contenty-Type' , 'text/html')

    if(!name){
        res.end('<h1> Preencha seu nome </h1> <form method="GET> <input type="text" name="name" /> <input ')
    } else {

    }
})
const address = 'http://brunorichter.kinghost.net/index.php?funcao=leitura'
const parsedUrl = new url.URL(address)


console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get('funcao'))
