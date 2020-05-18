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
    apiKey: "AIzaSyBq6qefl62IDEOH-9-PTAFyOSSYcNcUnvY",
    authDomain: "agencelune.firebaseapp.com",
    databaseURL: "https://agencelune.firebaseio.com",
    projectId: "agencelune",
    storageBucket: "agencelune.appspot.com",
    messagingSenderId: "240289148427",
    appId: "1:240289148427:web:e14e248b02d67697cf210e"
  };
  firebase.initializeApp(firebaseConfig)
}

}
