import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/product/product.component';




const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: '**', redirectTo: '/home' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


