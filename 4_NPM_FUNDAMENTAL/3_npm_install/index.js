const _ = require('lodash')

// npm install lodash

const a = [1,2,3,4,5,6]
const b = [2,4,6,8,10]

const diff = _.difference(a,b)

console.log(diff)



// para forçar atualização do pacote

// npx npm-check-updates -u