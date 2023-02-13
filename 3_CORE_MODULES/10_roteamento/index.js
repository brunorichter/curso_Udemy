const http = require('http')
const fs   = require('fs')
const url  = require('url')
const port = 3000

const server = http.createServer((req, res) => {
    const q = url.parse(req.url,true)
    const filename = q.pathname.substring(1) // pega somente o nome, depois do index.html

    

    if(filename.includes('html')){
        if(fs.existsSync(filename)){
            fs.readFile(filename, function(err,data){
                res.writeHead(200,{'Content-Type' : 'text/html'})
                res.write(filename)
                return res.end()
            })
        }
    }
    else{
        fs.readFile('index.html', function(err,data){
            res.writeHead(404,{'Content-Type' : 'text/html'})
            res.write(data)
            return res.end()
        })
    }    
})
    

    server.listen(port,()=>{
    console.log(`Servidor na porta ${port}`)
})


