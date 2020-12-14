import { Component, OnInit } from '@angular/core';
import { SmcService } from '../smc.service';
import { default as Web3} from 'web3';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-recycler',
  templateUrl: './recycler.component.html',
  styleUrls: ['./recycler.component.css']
})
export class RecyclerComponent implements OnInit {
  private web3:Web3;
  panelchecked = false;
  sharechecked = false;
  public panel = {panelid:"",recyclerAddr:""};
  _panelstatus:any;
  _panelid:any;
  _panelrecyclingcost:any;
  _monthsoflife:any;
  sharestatus:any;


  constructor(private _smcService:SmcService) { }

  ngOnInit(): void {
  }

  onPanelStatus(){
    let that = this;
    this._panelstatus=this._smcService.checkPanelStatus(this.panel.panelid).then(function(data){
      if(that.panel.recyclerAddr == data.recyclerAddress){
        that.panelchecked=true;
        that._panelstatus = data.isActive;
        that._panelid=that.panel.panelid;
        that._panelrecyclingcost=data.recyclingCost;
        that._monthsoflife=data.monthsOfLife;}
      else{
        that.panelchecked=false;
        alert("False Recycler Address!");
      }
      
    })

  }

  onShare(){
    let that = this;
    this.sharestatus=this._smcService.checkPanelStatus(this.panel.panelid).then(function(data){
      if(that.panel.recyclerAddr == data.recyclerAddress){
        that.sharechecked=true;
        that.sharestatus = data.pp10kForPanel;
        }
      else{
        that.panelchecked=false;
        alert("False Recycler Address!");
      }
      
    })

  }
}
