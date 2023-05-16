import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {authGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {CarsComponent} from "./cars/cars.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: "cars", component: CarsComponent, canActivate: [authGuard]},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LoginComponent},
  {path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {


  }

}
