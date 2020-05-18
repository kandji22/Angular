import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase'



@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties:Property[]=[]


   /*
  getProperties(){
   return new Promise((resolve,reject) =>{
      if (this.properties) {
        resolve(this.properties)
      }
      else{
        let error="aucun property existe"
        reject(error)
      }
    })

   return new Observable((observer)=>{
     if(this.properties){
       observer.next(this.properties)
       observer.complete()
     }
     else {
       let error=new Error("chargement incorecte")
       observer.error(error)
     }
  })
}
*/
setProperties(){
firebase.database().ref('/properties').set(this.properties)
}
getProperties(){
  firebase.database().ref('/properties').on('value',(data:any)=>{
    this.properties=data.val()?data.val():[]
    this.emitProperty()
  })
}
propertiesSubject=new Subject<Property[]>()
emitProperty(){
  this.propertiesSubject.next(this.properties)

}
suprimeProperties(index){
this.properties.splice(index,1)
this.setProperties()
this.emitProperty()
}
modifProperties(property,index){
  /*this.properties[index]=property
  this.setProperties()
  this.emitProperty()
*/
firebase.database().ref('/properties/'+index).update(property)
}
saveProperties(newProperti){
  this.properties.push(newProperti)
  this.setProperties()
  this.emitProperty()
}

uploadFile(file:File){
  return new Promise((resolve,reject)=>{
    const date=Date.now.toString()
    const fileName=date+file.name
    const onFile=firebase.storage().ref().child('properties/images'+fileName).put(file)
    onFile.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        console.log("...Chargement")
      },
      (error)=>{
        reject(error)
      },
      ()=>{
        onFile.snapshot.ref.getDownloadURL().then((url)=>{
            resolve(url)
        })
      }
      )
  })
}

deletefile(file:string){
if (file){
  const storageRef=firebase.storage().refFromURL(file)
  storageRef.delete().then(()=>{
    console.log("fichier supprimer")
  }).catch((error)=>{
console.log(error)
  })
}

}
getPropertyOnce(index){
  return new Promise((resolve,reject)=>{
    firebase.database().ref('/properties/'+index).once('value').then((value)=>{
      resolve(value.val())
    }).catch((error)=>{
      reject(error)
    })
  })
}
  constructor() { }

}
