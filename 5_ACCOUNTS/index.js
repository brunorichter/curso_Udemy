// modulos externos
const inquirer = require('inquirer')
const chalk    = require('chalk')

// modulos internos
const fs       = require('fs')
const { create } = require('domain')
const os = require('os')


operation()








function operation() {
    box('Bem Vindo')
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair']
        },
    ]).then((answer) => {
        const action = answer['action']

        if(action === 'Criar Conta'){
            createAccount()
        }else if(action === 'Depositar'){
            deposit()
        }else if(action === 'Consultar Saldo'){
            getAccountBalance()

        }else if(action === 'Sacar'){
            widthDraw()

        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por utilizar o sistema!'))
            process.exit()

        }
    


    }).catch(err => console.log(err))

}

// criar conta
function createAccount(){

    // Formulario para preencher
    console.log(chalk.bgGreen.black('====================================='))
    console.log(chalk.green        (' Parabéns por escolher nosso serviço '))
    console.log(chalk.green        ('    Defina as opções da sua conta    '))
    buildAccount()
}


function buildAccount(){
    inquirer
        .prompt([
            {
                name:'accountName',
                message:'Digite o nome'
            },
        ])
        .then((answer) => {
            const accountName = answer['accountName']
            if(!accountName){
                console.log(chalk.bgRed.black("Conta não pode ser vazio"))
                operation()
                return
            }
            console.log(accountName)

            if(!fs.existsSync('accounts')){
                fs.mkdirSync('accounts')
            }

            if(fs.existsSync(`accounts/${accountName}.json`)){
                console.log(
                    chalk.bgRed.black('Essa conta ja existe, escolha outro nome')
                )
                buildAccount()
                return
            }

            fs.writeFileSync(`accounts/${accountName}.json` ,
                '{"balance":0}',
                function (err){
                    console.log(err)
                }
            )
            console.log(
                chalk.bgGreen.black('Criado com Sucesso!')
            )

            operation()

        }).catch(err => console.log(err))
}

function deposit(){
    inquirer
        .prompt([{
            name:'accountName',
            message:'Qual o nome da conta?'
        }])
        .then((answer) => {
            const accountName = answer['accountName']
            if(!checkAccount(accountName)){
                return deposit()
            }
            inquirer.prompt([{
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }])
            .then((answer) => {
                const amount = answer['amount']
                addAmount(accountName,amount)


            }).catch(err => console.log(err))

        }).catch(err => console.log(err))
}

function widthDraw(){
    inquirer
            .prompt([{
                name:'accountName',
                message:'Qual o nome da conta?'
            }])
            .then((answer) => {
                const accountName = answer['accountName']
                if(!checkAccount(accountName)){
                    return deposit()
                }
                inquirer.prompt([{
                    name: 'amount',
                    message: 'Quanto você deseja sacar?'
                }])
                .then((answer) => {
                    const amount = answer['amount']
                    delAmount(accountName,amount)


                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
        }


function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`) | !accountName){
        console.log(chalk.bgRed.black('Esta conta não Existe!!!'))
        return false
    }

        return true

}


function getAccount(accountName){ // Traz a conta como um objeto a ser declarado
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
        })   
    return JSON.parse(accountJSON)
}

function addAmount(accountName, amount){

    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Digite um valor válido'))
        return deposit()
    }
    
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance) //Soma novo valor com valor atual na conta

    /////////////////////   ESCREVENDO ARQUIVO  ////////////////////////////////////////////
    //                       arquivo                   "valor a escrever"            "erro"
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){ // escreve novo valor transformando novamente em JSON
        console.log(err)
    })

    console.log(chalk.bgGreen.black(`Foi depositado o valor de R$${amount} na sua conta`))
    operation()

}

function delAmount(accountName, amount){

    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Digite um valor válido'))
        return deposit()
    }
    
    if(parseFloat(accountData.balance) < parseFloat(amount)){
        console.log(chalk.bgRed.black(`Saldo insuficiente na conta`))
        return widthDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)    //Soma novo valor com valor atual na conta

    /////////////////////   ESCREVENDO ARQUIVO  ////////////////////////////////////////////
    //                       arquivo                   "valor a escrever"            "erro"
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){ // escreve novo valor transformando novamente em JSON
        console.log(err)
    })

    console.log(chalk.bgGreen.black(`Foi sacado o valor de R$ ${amount} na sua conta`))
    operation()

}

function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual a conta?'
    }
    ]).then((answer) => {

        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return getAccountBalance
        }
        // se a conta existe

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Seu saldo é de R$ ${accountData.balance}`))
        operation()

    }).catch((err) => console.log(err))

}




function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}


function box($titulo,$conteudo=''){
    
    if($titulo.length>$conteudo.length){
        $size = $titulo.length + 4
    } else {
        $size = $conteudo.length + 4
    }
    $linha1 ='╔'
    $linha2 ='║ ' + $titulo + ' ║'
    $linha3 ='╚'
    for(let item in range(parseInt($size)-2)){
        $linha1 += '═' 
        $linha3 += '═' 
    }
    $linha1 += '╗' 
    $linha3 += '╝' 
    console.log($linha1)
    console.log($linha2)
    console.log($linha3)
    
}
// 185 ╣
// 186 ║
// 187 ╗
// 188 ╝
// 200 ╚
// 201 ╔
// 202 ╩
// 203 ╦
// 204 ╠
// 205 ═
// 206 ╬
