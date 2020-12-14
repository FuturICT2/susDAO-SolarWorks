# SolarWorks
# Building Webfront with Angular

## Declaration of versions 

Solidity 0.6.4
Truffle (most updated)
Genache (most updated)
angular 10 
npm (most updated)


## Deployment Steps
please download the github repo and the above tools first.

```sh
#fire genache
genache-cli 

#init truffle in folder if already init than not required 
truffle init

#add migration js files in folder migrations follow the name invention

truffle compile
truffle migration

#if already compiled and migrated use 
truffle deploy --reset

#install packages 
npm install 

#adapt the contract address and account address
#change at smc.service.ts
#chaneg at admin.conponent.ts

#init angular through npm
npm start 
#or init angular through angular initiator 
ng serve

#go to the browser
localhost:4200

```

## Interacte with contract using truffle console

```sh
truffle console
#prepare accounts and functions
let instance = await Main.deployed()
let accounts = await web3.eth.getAccounts()
let defaultAccount = await accounts[0]
let manufacturerAccount = await accounts[1]
let recyclerAccount= await accounts[2]

#register first panel
instance.registerPanel(1010101,"solarworkAG",manufacturerAccount,defaultAccount)
###tested all function only registration worked not the others
#did not work[error][d1e2]
instance.setRecycler(1010101,recyclerAccount,web3.utils.toWei('5','ether'))
#deposit
instance.deposit(1010101,{from:defaultAccount,value:web3.utils.toWei('1','ether')})

```

