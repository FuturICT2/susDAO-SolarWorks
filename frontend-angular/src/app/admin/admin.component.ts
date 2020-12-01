import { Component, OnInit } from '@angular/core';
import { default as Web3} from 'web3';
import { SmcService } from '../smc.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private web3:Web3;
  public panel = {id:"",rAddr:"",rCost:""};
  public _panel = {id:"",pp10k:""};
  public __panel = {id:""};
  recyclerregistered=false;
  deployerAcc:any;
  recyclertxhash:any;
  shareupdated=false;
  sharetxhash:any;
  panelclosed=false;
  closetxhash:any;

  constructor(private _smcService:SmcService) { }

  ngOnInit(): void {
  }

  onRegisterRecycler(){
    this.deployerAcc="0x01264f571e048c93Dd2A9A04d7FB040255B4e229";
    let that = this;
    this._smcService.setRecycler(this.panel.id,this.panel.rAddr,this.panel.rCost,this.deployerAcc).then(function(data){
      that.recyclerregistered=true;
      that.recyclertxhash=data;
    })
  }

  onUpdateShare(){
    this.deployerAcc="0x01264f571e048c93Dd2A9A04d7FB040255B4e229";
    let that = this;
    this._smcService.updateShare(this._panel.id,this._panel.pp10k,this.deployerAcc).then(function(data){
      that.shareupdated=true;
      that.sharetxhash=data;
    })
  }

  onClosePanel(){
    this.deployerAcc="0x01264f571e048c93Dd2A9A04d7FB040255B4e229";
    let that = this;
    this._smcService.closePanel(this.__panel.id,this.deployerAcc).then(function(data){
      that.panelclosed = confirm("Are you sure about closing this panel?");
      that.closetxhash=data;
    })
  }
    



}
