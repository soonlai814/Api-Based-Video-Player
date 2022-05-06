import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VdoPlayerComponent } from './vdo-player/vdo-player.component';

const routes: Routes = [
  { path: 'vdo', component: VdoPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
