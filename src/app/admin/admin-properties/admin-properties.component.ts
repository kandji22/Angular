import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup,FormBuilder, Validators} from '@angular/forms'
import {PropertiesService} from "src/app/services/properties.service"
import {Subscription} from "rxjs"
import * as $ from 'jquery'
import { Property } from 'src/app/interfaces/property';
@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  fileuploading=false
  fileuploaded=false
  urlFile:any[]=[]
  index
  indexToUpdate
  updatornew=false
  propertiesForm:FormGroup
  newtab:Property[]=[]
  subscription:Subscription

  constructor(
    private formBuilder:FormBuilder,
    private propertiesService:PropertiesService
  ) { }

  ngOnInit(): void {
   this.InitialiseForm()
    this.propertiesService.propertiesSubject.subscribe((data:Property[])=>{
      this.newtab=data
    })
    this.propertiesService.getProperties()
    this.propertiesService.emitProperty()
  }
  InitialiseForm(){
    this.propertiesForm=this.formBuilder.group({
      title: ["",Validators.required],
      category: ["",Validators.required],
      surface:["",Validators.required],
      rooms: ["",Validators.required],
      price:["",Validators.required],
      description:["",Validators.required],
      sold:"",

    })
  }
  handleSubmit(){
    const newProperti:Property =this.propertiesForm.value
    newProperti.photos= this.urlFile?this.urlFile:[]
   newProperti.sold= this.propertiesForm.get("sold").value?this.propertiesForm.get("sold").value:false
    if(this.updatornew){
      this.propertiesService.modifProperties(newProperti,this.indexToUpdate)
      $('#propertiesFormModal').modal('hide')
    }
    else {
this.propertiesService.saveProperties(newProperti)
$('#propertiesFormModal').modal('hide')
  }
}
  resetForm(){
    this.updatornew=false
    this.propertiesForm.reset()
    this.urlFile=[]
  }
  ModalSup(id){
$('#SuprimModalCenter').modal('show')
this.index=id


  }
  ConfirmSupProperties(){
    this.newtab[this.index].photos.forEach((photo)=>{
      this.propertiesService.deletefile(photo)
    })
    this.propertiesService.suprimeProperties(this.index)
    $('#SuprimModalCenter').modal('hide')
  }
  ModalModif(property:Property) {
    this.updatornew=true
    $('#propertiesFormModal').modal('show')
this.propertiesForm.get('title').setValue(property.title)
this.propertiesForm.get('category').setValue(property.category)
this.propertiesForm.get('surface').setValue(property.surface)
this.propertiesForm.get('rooms').setValue(property.rooms)
this.propertiesForm.get('price').setValue(property.price)
this.propertiesForm.get('description').setValue(property.description)
this.propertiesForm.get('sold').setValue(property.sold)
this.urlFile=property.photos?property.photos:[]
const index =this.newtab.findIndex((propertyEL)=>{
  if(property===propertyEL){
    return true
  }
})
this.indexToUpdate=index
  }
  onuploadFile(event){
this.fileuploaded=true
this.propertiesService.uploadFile(event.target.files[0]).then((url:string)=>{
this.urlFile.push(url)
this.fileuploaded=false
this.fileuploading=true
setTimeout(()=>{
  this.fileuploading=false
},5000)
})

  }
  onRemove(index){
this.propertiesService.deletefile(this.urlFile[index])
this.urlFile.splice(index,1)
  }

}
