import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isLogidIn=false
  constructor(
    private authenticationServive:AuthenticationService
  ) { }

  ngOnInit(): void {
firebase.auth().onAuthStateChanged((sessionStorage)=>{
if (sessionStorage){
  console.log(sessionStorage)
  this.isLogidIn=true
}
else {
  this.isLogidIn=false
}
})
  }
  deconexion() {
this.authenticationServive.sessionOf()
  }
}
