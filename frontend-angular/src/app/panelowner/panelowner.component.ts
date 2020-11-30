import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { SmcService } from '../smc.service';
import { default as Web3} from 'web3';


@Component({
  selector: 'app-panelowner',
  templateUrl: './panelowner.component.html',
  styleUrls: ['./panelowner.component.css']
})
export class PanelownerComponent implements OnInit {
  private web3:Web3;
  public panel = {rnumber:"",manufct:"",manufctAddr:"",ownerAddr:""};
  private regContractAddr:string;
  transactionid:any;
  panelregistered=false;
  panelid:any;

  //mypanel.panelid:any;
  //_registrationNumber:any;
  //_manufacturer:any;
  //_manufacturerAddress:any;
  //_ownerAddress:any;


  constructor(private _smcService:SmcService) { }

  ngOnInit(){
  }

  onRegisterPanel(){
    //this.panel=this._smcService.mypanel;
    this.panelregistered=true;
    let that = this;
    this._smcService.registerPanel(this.panel.rnumber,this.panel.manufct,this.panel.manufctAddr,this.panel.ownerAddr).then(function(data){
      that.panelid=data;
    })
  }

}

//0x01264f571e048c93Dd2A9A04d7FB040255B4e229 (100 ETH)
//0xC5B30fc89197418F02fC5b8A6603e3e44aE5c3Df
// mypanel.regNo,
//       mypanel.manufct,
//       mypanel.manufctAddr,
//       mypanel.ownerAddr,

//  onRegisterPanel(mypanel){
//   if(mypanel){
//     this._smcService.addPanel(mypanel).then(() =>{
//       this.mypanel={};
//     });
//   }
// }