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

  // getCarList(): Observable<Car[]> {
  //
  //   return this.http.get('http://localhost:5000/api/v1/cars', {
  //     headers: this.headers
  //   }) as Observable<Car[]>
  // }

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

  deleteCar(id: string) {
    return this.http.delete('http://localhost:5000/api/v1/cars/' + id, {
      headers: this.headers
    })


  }

}
