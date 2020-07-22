import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { AboutComponent } from './pages/about/about.component';
import { MapPageComponent } from './pages/map/map.component';


const routes: Routes = [
  {
    path:'',
    component : HomeComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'map',
    component : MapPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
