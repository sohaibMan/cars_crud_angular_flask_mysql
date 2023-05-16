import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "../api-service.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent implements OnInit {
  displayedColumns: string[] = ['car_id', 'year', 'make', 'model', 'body_styles', 'actions'];
  cars: Car[] = [];
  page: number = 1;
  limit: number = 10;
  count: number = 0;


  constructor(private apiService: ApiServiceService) {

  }

  // paginationChangeHandler(page, limit) {
  //   console.log(page, limit)
  //   // this.page = page;
  //   // this.limit = limit;
  //   // this.ngOnInit();
  // };

  ngOnInit() {
    {
      this.apiService.getCarListPagination(this.page, this.limit).subscribe(({cars, count}) => {
          this.cars = cars;
          this.count = count;
        }
      )
    }
  }

  handlePageEvent($event: PageEvent) {
    console.log($event)
    const {pageIndex, pageSize} = $event;
    this.page = pageIndex * pageSize;
    this.limit = pageSize;
    this.apiService.getCarListPagination(this.page, this.limit).subscribe(({cars, count}) => {
        this.cars = cars;
        this.count = count;
      }
    )

  }

  addCar() {

  }

  editCar(car:Car) {

  }

  deleteCar(car:Car) {

  }
}


export interface Car {
  car_id: number;
  year: number;
  make: string;
  model: string;
  body_styles: string;
}
