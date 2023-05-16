import {Component, Inject, OnInit} from '@angular/core';
import {ApiServiceService} from "../api-service.service";
import {PageEvent} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

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


  constructor(private apiService: ApiServiceService, public dialog: MatDialog) {
  }


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

    const {pageIndex, pageSize} = $event;
    this.page = pageIndex * pageSize;
    this.limit = pageSize;
    this.apiService.getCarListPagination(this.page, this.limit).subscribe(({cars, count}) => {
        this.cars = cars;
        this.count = count;
      }
    )

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCarDialog, {});

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }
      if (result.length !== 4) {
        return;
      }
      if (!result[0] || !result[1] || !result[2] || !result[3]) {
        return;
      }
      // this.dialogRef.body_styles
      const year = result[0]
      const make = result[1]
      const model = result[2];
      const body_styles = `[${result[3]}]`;

      this.addCar(year, make, model, body_styles);

    });
  }

  addCar(year: number, make: string, model: string, body_styles: string) {
    this.apiService.addCar(year, make, model, body_styles).subscribe((res) => {
      const car: Car = {
        car_id: 1,
        year: year,
        make: make,
        model: model,
        body_styles: body_styles
      }
      this.cars = [car, ...this.cars]

    })
  }

  editCar(car: Car) {
    this.apiService.editCar(car).subscribe((res) => {
      console.log(car)
      this.cars = this.cars.map((c) => {
        if (c.car_id === car.car_id) {
          return car;
        }
        return c;
      })
      console.log(this.cars)

    })
  }

  deleteCar(car_id
              :
              number
  ) {
    this.apiService.deleteCar(car_id).subscribe((res) => {
        this.cars = this.cars.filter((c) => c.car_id !== car_id)
      }
    )

  }

  openEditDialog(car: Car) {

    const dialogRef = this.dialog.open(EditCarDialog, {
      data: {
        year: car.year,
        make: car.make,
        model: car.model,
        body_styles: car.body_styles
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }
      if (result.length !== 4) {
        return;
      }
      if (!result[0] || !result[1] || !result[2] || !result[3]) {
        return;
      }
      // this.dialogRef.body_styles
      const year = result[0]
      const make = result[1]
      const model = result[2];
      const body_styles = `[${result[3]}]`;
      car.year = year;
      car.make = make;
      car.model = model;
      car.body_styles = body_styles;
      this.editCar(car);

    });

  }
}


export interface Car {
  car_id: number;
  year: number;
  make: string;
  model: string;
  body_styles: string;
}


@Component({
  selector: 'create-car-dialog.html',
  templateUrl: 'create-car-dialog.html',
})
export class CreateCarDialog {
  year: number;
  make: string;
  model: string;
  body_styles: string;


  constructor(public dialogRef: MatDialogRef<CreateCarDialog>, @Inject(MAT_DIALOG_DATA) public data: Car) {
  }


  onNoClick() {
    this.dialogRef.close();
  }


}

@Component({
  selector: 'edit-car-dialog.html',
  templateUrl: 'edit-car-dialog.html',
})
export class EditCarDialog {
  year: number;
  make: string;
  model: string;
  body_styles: string;


  constructor(public dialogRef: MatDialogRef<EditCarDialog>, @Inject(MAT_DIALOG_DATA) public data: Car) {
    this.year = data.year;
    this.make = data.make;
    this.model = data.model;
    this.body_styles = data.body_styles;
  }


  onNoClick() {
    this.dialogRef.close();
  }


}

