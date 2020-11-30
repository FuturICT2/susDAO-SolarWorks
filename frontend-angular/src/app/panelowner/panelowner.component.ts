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
  public mypanel:any ={};
  private regContractAddr:string;

  //mypanel.panelid:any;
  //_registrationNumber:any;
  //_manufacturer:any;
  //_manufacturerAddress:any;
  //_ownerAddress:any;


  constructor(private _smcService:SmcService) { }

  ngOnInit(){
  }

  onRegisterPanel(mypanel){
    this._smcService.addPanel(mypanel)
  }

}
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