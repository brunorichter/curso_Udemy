const http = require('http')
const fs   = require('fs')
const { url } = require('inspector')
const port = 3000

const server = http.createServer((req, res) => {

    fs.readFile('index.html', function(err,data) {
        
        const urlInfo = require('url').parse(req.url,true)

        const name = urlInfo.query.name

        if(!name){
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.write(data)
            return res.end()
        }
        else{
            const newline = name  + '\r\n'
            fs.writeFile("arquivo.txt",name,function(err,data){
                res.writeHead(302,{
                    Location:'/',
                })
            })
        }

        
    })

})
    server.listen(port,()=>{
    console.log(`Servidor na porta ${port}`)
})


