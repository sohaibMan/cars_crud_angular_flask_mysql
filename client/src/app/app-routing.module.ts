import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppComponent} from "./app.component";
import {authGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LoginComponent},
  {path: "", component: AppComponent, canActivate: [authGuard]},
  {path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {


  }

}
