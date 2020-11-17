# SolarWorks
Awesome Blockchain Project by Awesome People

## Declaration of versions 
(for coorditination, can be changed, just example for now)

Solidity 0.6.4
Truffle
Genache
Geth
npm 

## Deployment Steps

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

```

## Interacte with contract using truffle console

```sh
truffle console
#prepare accounts and functions
let instance = await Main.deployed()
let accounts = await web3.eth.getAccounts()
let defaultAccount = await accounts[0]
let manufacturerAccount = await accounts[1]
#register first panel
instance.registerPanel(1010101,"solarworkAG",manufacturerAccount,defaultAccount)

```
