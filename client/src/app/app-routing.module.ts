import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppComponent} from "./app.component";
import {authGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {CarsComponent} from "./cars/cars.component";

const routes: Routes = [
  {path: "cars", component: CarsComponent, canActivate: [authGuard]},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LoginComponent},
  // {path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {


  }

}
