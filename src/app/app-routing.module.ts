import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPlayerComponent } from './ngx-playerr/ngx-player.component';
import { VdoPlayerDetectedComponent } from './vdo-player-detected/vdo-player-detected.component';
import { VdoPlayerComponent } from './vdo-player/vdo-player.component';

const routes: Routes = [
  { path: 'ngx', component: NgxPlayerComponent },
  { path: 'ads', component: VdoPlayerComponent },
  { path: 'ads-detected', component: VdoPlayerDetectedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
