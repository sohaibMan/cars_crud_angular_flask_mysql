import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true
  username: string = "";
  isUserNameValid = true
  password: string = "";
  isPasswordNameValid = true
  responseErrorMessage = ""

  constructor(private router: Router) {
    localStorage.removeItem("jwt")
  }

  async submitHandler($event: FormDataEvent) {
    $event.preventDefault()
    if (this.username.length < 3) {
      this.isUserNameValid = false;
      return;
    }
    if (this.password.length < 3) {
      this.isPasswordNameValid = false;
      return;
    }
    // reset the state
    this.isUserNameValid = true;
    this.isPasswordNameValid = true;
    this.responseErrorMessage = ""

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      username: this.username,
      password: this.password
    });

    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    fetch("http://localhost:5000/api/v1/users/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "error") return this.responseErrorMessage = result.data
        localStorage.setItem("jwt", result.data.jwt)
        this.router.navigate(['/'])

      })
      .catch(error => console.log('error', error));

  }
}
