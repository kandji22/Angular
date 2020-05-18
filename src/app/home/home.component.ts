import { Component, OnInit, OnDestroy } from '@angular/core';
import {PropertiesService} from '../services/properties.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  properties =[]

    title = 'monAngence';

propertieSubcription:Subscription

    getSolvalue(id){
      if(this.properties[id].sold){
        return 'green';
      }
      else {
        return 'red';
      }
    }
  constructor( private propertiesService: PropertiesService) {

  }

  ngOnInit(): void {
    this.propertieSubcription=this.propertiesService.propertiesSubject.subscribe((data:any)=>{
     this.properties=data
    }),
    (error)=>{
      console.error(error)
    }
    this.propertiesService.getProperties()
    this.propertiesService.emitProperty()
  }

ngOnDestroy(){
  this.propertieSubcription.unsubscribe()
}

}
