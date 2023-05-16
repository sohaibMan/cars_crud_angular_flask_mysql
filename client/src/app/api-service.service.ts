import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) {
  }

  getCarList() {
    return this.http.get('http://localhost:5000/api/v1/cars', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt") || ''
      }
    })
  }


}
