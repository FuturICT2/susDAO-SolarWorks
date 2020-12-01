import { Component, OnInit } from '@angular/core';
import { SmcService } from '../smc.service';
import { default as Web3} from 'web3';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-eleccorp',
  templateUrl: './eleccorp.component.html',
  styleUrls: ['./eleccorp.component.css']
})
export class EleccorpComponent implements OnInit {
  private web3:Web3;
  public panel = {id:"",manufctAddr:"",payamount:""};
  panelpaid=false;
  paydata:any;

  constructor(private _smcService:SmcService) { }

  ngOnInit(): void {
  }

  onPayPanel(){
    let that = this;
    this._smcService.payPanel(this.panel.id,this.panel.manufctAddr,this.panel.payamount).then(function(data){
      that.panelpaid=true;
      that.paydata=data;
    })
  }

  

}
