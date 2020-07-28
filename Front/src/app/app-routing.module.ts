import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { AboutComponent } from './pages/about/about.component';
import { MapPageComponent } from './pages/map/map.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { MapGuardService } from './services/map-guard.service';


const routes: Routes = [
  {
    path:'',
    component : IntroductionComponent
  },
  {
    path:'engine',
    component : HomeComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'map',
    component : MapPageComponent,
    canActivate : [MapGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
