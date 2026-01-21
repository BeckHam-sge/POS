import {Component, inject, OnInit } from '@angular/core';
import {MatDialogContent,MatDialogActions,MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-idname',
  templateUrl: './inventory-form.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatDialogActions,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOption,
    CommonModule
]
})
export class inventoryformComponent implements OnInit  {

  private dialogRef = inject(MatDialogRef<inventoryformComponent>);
  private fb = inject(FormBuilder);
  public data = inject(MAT_DIALOG_DATA);

  dataSource: any;
  productForm: any;
  categories$!: Observable<any[]>;
  categories: any;
  data_id: any;

  ngOnInit(): void {
    this.initProductForm();
    this.editProduct();
  }

  editProduct() {
    console.log( this.data);
    if (this.data) {
      this.productForm.patchValue({
        id: this.data.id,
        productName: this.data.productName,
        categoryId: this.data.categoryId,
        price: this.data.price,
        stock: this.data.stock,
      });
    } else {
      console.log();
    }
}

    initProductForm(){
    this.productForm = this.fb.group({
      id: [''],
      productName: ['', Validators.required],
      categoryId: ['',Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

Save() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

}
