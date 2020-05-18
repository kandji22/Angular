import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

 /* signupService(email:string,password:string){
return new Promise((resolve,reject)=>{
firebase.auth().createUserWithEmailAndPassword(email,password)
.then(()=>{
resolve()
}).catch((error)=>{
  reject(error)
})
})
  }*/

  authService(email:string,password:string){
    return new Promise((resolve,reject)=>{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((data)=>{
    resolve(data)
    }).catch((error)=>{
      reject(error)
    })
    })
      }
      sessionOf(){
        firebase.auth().signOut()
      }
}
