import { Injectable } from '@angular/core';
import { default as Web3} from 'web3';

declare let require: any;
declare let window: any;
const tokenAbi = require('../../../build/contracts/Main.json');

@Injectable({
  providedIn: 'root'
})
export class SmcService {

  public web3:Web3;
  public main:any;
  private accounts:any;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    this.accounts=this.web3.eth.accounts;
    this.web3.eth.accounts.privateKeyToAccount("0xb3a783823ff3e95a51f0274e0c6c9cbf78e0c3cee8b5fc89a451bc6914ad0eb6")
    this.main = new this.web3.eth.Contract(tokenAbi.abi, "0xea8FE12A6c497396437b71bb9a053f08c6397DeC");
  }
  public getAccount() {
    if (!this.accounts) {
      console.log('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return null;
    }
    return this.accounts[0];
  }

  public addPanel({rnumber,manufct,manufctAddr,ownerAddr}){
    return this.main.methods.registerPanel(rnumber,manufct,manufctAddr,ownerAddr);
  }
  
}
