import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import{MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {
freshnessList = ["Brand New","second Hand", "recycled"];
productform !:FormGroup;
actionBtn :string = "save"  //action button

  constructor(private formBuilder:FormBuilder ,
    private api:ApiService ,
   @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef:MatDialogRef<DailogComponent>) { }

  ngOnInit(): void {
    this.productform = this.formBuilder.group({
      productName :['',Validators.required],
      category:['',Validators.required],
      freshness :['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    });

    // console.log(this.editData);

    if(this.editData){
      this.actionBtn="update"
      this.productform.controls['productName'].setValue(this.editData.productName);
      this.productform.controls['category'].setValue(this.editData.category);
      this.productform.controls['freshness'].setValue(this.editData.freshness);
      this.productform.controls['price'].setValue(this.editData.price);
      this.productform.controls['comment'].setValue(this.editData.comment);
      this.productform.controls['date'].setValue(this.editData.date);
    }
    
  }
  addProduct(){
    //  console.log(this.productform.value);
if(!this.editData){
  if(this.productform.valid){
    this.api.postproduct(this.productform.value)
    .subscribe({
      next:(res)=>{
        alert("added successfully")
        this.productform.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("error while sending")
      }
    })

  }
}else{
  this.updateProduct()
}
}

updateProduct(){
  this.api.putproduct(this.productform.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("product update succesfully succesufully");
      this.productform.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("product not added succesfully")
    }
  })
}
}
