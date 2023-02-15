// modulos externos
const inquirer = require('inquirer')
const chalk    = require('chalk')

// modulos internos
const fs       = require('fs')
const { create } = require('domain')
const os = require('os')


operation()








function operation() {
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

        }else if(action === 'Sacar'){

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