import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DailogComponent } from './dailog/dailog.component';
import { ApiService } from './service/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  //implemented
  title = 'angualar13';
  displayedColumns: string[] = ['productName', 'category','date','freshness','price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog ,private api :ApiService){

  }
  ngOnInit(): void {
    this.getAllProduct()
  }
  openDialog() {
    this.dialog.open(DailogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val =='save'){
        this.getAllProduct()
      }
    })
  }
getAllProduct(){
  this.api.getproduct()
  .subscribe({
    next:(res)=>{
      // console.log(res);    
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
    },
    error:(err)=>{
      alert("error while fetching the record!!")
    }
  })
}
editProduct(row:any){
  this.dialog.open(DailogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val =='update'){
      this.getAllProduct();
    }
  })
}

deleteProduct(id:number)
{
  this.api.deleteproduct(id)
  .subscribe({
    next:(res)=>{
      alert("product deleted successfully")
      this.getAllProduct()
    },
    error:()=>{
      alert("error while deleting a product")
    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


}


