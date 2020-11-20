import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { PanelownerComponent } from './panelowner/panelowner.component';
import { RecyclerComponent } from './recycler/recycler.component';
import { EleccorpComponent } from './eleccorp/eleccorp.component';
import { ProducerComponent } from './producer/producer.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    //outlet: 'popup'
  },
  {
    path: 'panelowner',
    component: PanelownerComponent,
    //outlet: 'popup'
  },
  {
    path: 'recycler',
    component: RecyclerComponent,
    //outlet: 'popup'
  },
  {
    path: 'producer',
    component: ProducerComponent,
    //outlet: 'popup'
  },
  {
    path: 'eleccorp',
    component: EleccorpComponent,
    //outlet: 'popup'
  },
  {
    path: 'admin',
    component: AdminComponent,
    //outlet: 'popup'
  },
  

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
