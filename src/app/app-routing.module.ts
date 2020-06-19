import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { DevicesModule } from './devices/devices.module';


const routes: Routes = [
  {
    path: '', redirectTo: '/devices', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
