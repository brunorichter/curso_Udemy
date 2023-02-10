// import
const fs = require('fs')    // módulo File System

fs.readFile('ips2.txt','utf8',(err,data) => {

    if(err){
        console.log(err)
        return
    }
    console.log(data)
})