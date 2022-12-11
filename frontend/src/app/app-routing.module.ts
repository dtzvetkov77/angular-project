import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CreatePageComponent } from './components/pages/create-page/create-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:searchTerm', component: HomeComponent
  },
  {
    path: 'tag/:tag', component: HomeComponent
  },
  {
    path: 'food/:id', component: FoodPageComponent
  },
  {
    path: 'cart-page', component: CartPageComponent,canActivate:[AuthGuard]
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'register', component: RegisterPageComponent
  },
  {
    path: 'create', component: CreatePageComponent, canActivate:[AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
