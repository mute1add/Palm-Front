import {Component, OnInit} from '@angular/core';
import {Service} from "../../../../../shared/models/service";
import {ServiceService} from "../../../../../shared/service/service.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [ServiceService]
})
export class ServicesComponent implements OnInit {

  service: Service[] = [];

  constructor(private _serviceService: ServiceService) {
    _serviceService.findAll().subscribe(next => {
        this.service = next;
        console.log(this.service)
      }
    ), error => {
      console.log(error)
    }
  }

  deleteService(i){
    this._serviceService.delete(i).subscribe(next =>{
      this._serviceService.findAll().subscribe(value => {
        this.service = value;
        console.log(value);
      });
    }), error => {
      console.log(error);
    }
  }


  ngOnInit() {
  }

}
