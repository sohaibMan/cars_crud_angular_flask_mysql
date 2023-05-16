import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Car} from "./cars-table/cars-table.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly headers: HttpHeaders = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + localStorage.getItem("jwt") || '');


  constructor(private http: HttpClient) {
  }



  getCarListPagination(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit)
    return this.http.get('http://localhost:5000/api/v1/cars/', {
      headers: this.headers,
      params: params
    }) as Observable<{ cars: Car[], count: number }>
  }

  getCar(id: string) {
    return this.http.get('http://localhost:5000/api/v1/cars/' + id, {
      headers: this.headers
    }) as Observable<Car>
  }

  deleteCar(id: number) {
    return this.http.delete('http://localhost:5000/api/v1/cars/' + id, {
      headers: this.headers
    })


  }

  addCar(year: number, make: string, model: string, body_styles: string) {
    const body = JSON.stringify({year, make, model, body_styles})
    console.log(body)
    return this.http.post('http://localhost:5000/api/v1/cars/', body, {
      headers: this.headers

    })

  }

  editCar(car: Car) {
    const body = JSON.stringify(car)
    return this.http.put('http://localhost:5000/api/v1/cars/' + car.car_id, body, {
      headers: this.headers

    })

  }
}
