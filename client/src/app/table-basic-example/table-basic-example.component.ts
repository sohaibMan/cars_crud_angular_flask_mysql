import {Component} from '@angular/core';
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css']
})
export class TableBasicExampleComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [];

  constructor(private apiService: ApiServiceService) {


  }

  ngOnInit() {
    this.apiService.getCarList()
    {
      this.apiService.getCarList().subscribe((res: any) => {
          console.log(res);
        }
      )
    }
  }

}


export interface PeriodicElement {
  car_id: number;
  year: number;
  make: string;
  model: string;
  body_styles: string;
}
