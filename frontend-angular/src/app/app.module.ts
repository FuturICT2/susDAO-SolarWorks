import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelownerComponent } from './panelowner/panelowner.component';
import { RecyclerComponent } from './recycler/recycler.component';
import { EleccorpComponent } from './eleccorp/eleccorp.component';
import { ProducerComponent } from './producer/producer.component';
import { AdminComponent } from './admin/admin.component';

import { Router } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    PanelownerComponent,
    RecyclerComponent,
    EleccorpComponent,
    ProducerComponent,
    AdminComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router:Router){}
 }
