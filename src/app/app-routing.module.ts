import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPlayerComponent } from './ngx-playerr/ngx-player.component';
import { TableComponent } from './Sample/table.component';
import { VdoPlayerDetectedComponent } from './vdo-player-detected/vdo-player-detected.component';
import { VdoPlayerComponent } from './vdo-player/vdo-player.component';

const routes: Routes = [
  // { path: '', redirectTo: '/ads:id', pathMatch: 'full' },
  { path: 'ngx', component: NgxPlayerComponent },
  { path: 'board/:id', component: VdoPlayerComponent },
  { path: 'ads-detected', component: VdoPlayerDetectedComponent },
  { path: 'table', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
