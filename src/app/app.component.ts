import { Component } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(){
  const firebaseConfig = {
    apiKey: "$(à mettre)",
    authDomain: "agencelune.firebaseapp.com",
    databaseURL: "https://agencelune.firebaseio.com",
    projectId: "agencelune",
    storageBucket: "agencelune.appspot.com",
    messagingSenderId: "240289148427",
    appId: "$"
  };
  firebase.initializeApp(firebaseConfig)
}

}
