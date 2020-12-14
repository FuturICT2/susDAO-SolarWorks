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
  private defaultAcc:any;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    this.accounts=this.web3.eth.accounts;
    this.web3.eth.accounts.privateKeyToAccount("0x416af587eb0a78dea0bc4e46364c8fc5d033036ad0f32ea80c44a51dda7c3d5e");
    this.main = new this.web3.eth.Contract(tokenAbi.abi, "0x701D1211386164E0A60002b10cb769B1c607bf1E");
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


  public registerPanel(rnumber,manufct,manufctAddr,ownerAddr): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.registerPanel(rnumber,manufct,manufctAddr,ownerAddr).send({from:ownerAddr,gas:"6721975"}, function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(data);
          resolve(data);
      });
      this.main.methods.registerPanel(rnumber,manufct,manufctAddr,ownerAddr).call(null, function(err1, data1) {
        if (err1) {
          console.error(err1);
          reject(err1);
        }
        console.log(data1);
        resolve(data1);
    });
    }) as Promise<any>; 
  }

  public checkPanelStatus(panelid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.panels(panelid).call(function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(data);
          resolve(data);
      });
    }) as Promise<any>; 
  }

  public checkPanelWatts(__panelid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.getWatthours(__panelid).call(function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(data);
          resolve(data);
      });
    }) as Promise<any>; 
  }

  public checkShare(_panelid): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.calculateShares(_panelid).call(function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          //console.log(data);
          resolve(data);
      });
    }) as Promise<any>; 
  }

  public payPanel(__panelid,__electAddr,__amount,__watthours): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.pay(__panelid,__watthours).send({from:__electAddr,gas:"6721975",value:__amount}, function(__err, __data) {
          if (__err) {
            console.error(__err);
            reject(__err);
          }
          console.log(__data);
          resolve(__data);
      });
    }) as Promise<any>; 
  }

  public setRecycler(_panelid,_recyclerAddr,_recyclingCost,_deployerAcc): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.setRecycler(_panelid,_recyclerAddr,_recyclingCost).send({from:_deployerAcc,gas:"6721975"}, function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(data);
          resolve(data);
      });
    }) as Promise<any>; 
  }

  public updateShare(_panelid,_pp10kForPanel,_deployerAcc): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.updatePanelShare(_panelid,_pp10kForPanel).send({from:_deployerAcc,gas:"6721975"}, function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(data);
          resolve(data);
      });
    }) as Promise<any>; 
  }

  public closePanel(_panelid,_deployerAcc): Promise<any> {
    return new Promise((resolve, reject) => {
      this.main.methods.close(_panelid).send({from:_deployerAcc,gas:"6721975"}, function(data) {
          resolve(data);
      });
    }) as Promise<any>; 
  }
  //0x01264f571e048c93Dd2A9A04d7FB040255B4e229 (100 ETH)
  //0xC5B30fc89197418F02fC5b8A6603e3e44aE5c3Df
  // public registerPanel(rnumber,manufct,manufctAddr,ownerAddr): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.main.methods.registerPanel(rnumber,manufct,manufctAddr,ownerAddr).call(null, function(err, data) {
  //         if (err) {
  //           console.error(err);
  //           reject(err);
  //         }
  //         console.log(data);
  //         resolve(data);
  //     });
  //   }) as Promise<any>; 
  // }
  
}
