import { Component, OnInit } from '@angular/core';
import { SmcService } from '../smc.service';
import { default as Web3} from 'web3';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
}) 

export class ProducerComponent implements OnInit { 

  private web3:Web3;
  public panel = {rnumber:"",manufct:"",manufctAddr:"",ownerAddr:""};
  private regContractAddr:string;
  transactionid:any;
  panelregistered=false;
  panelid:any;

  constructor(private _smcService:SmcService) { }

  ngOnInit(): void {
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
