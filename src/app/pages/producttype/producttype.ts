import { Component, ViewChild, TemplateRef, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ProductType {
  id: number;
  productName: string;
}

@Component({
  selector: 'app-producttype',
  standalone: true, // เพิ่ม standalone: true ถ้าใช้ Angular รุ่นใหม่
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './producttype.html',
  styleUrl: './producttype.scss',
})
export class Producttype {
  @ViewChild('myDialog') myDialogTemplate!: TemplateRef<any>;

  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  displayedColumns: string[] = ['id', 'productName', 'actions'];

  // เพิ่มตัวแปรเหล่านี้เพื่อแก้ Error TS2339
  isEdit = false;
  currentEditId: number | null = null;

  dataSource = new MatTableDataSource<ProductType>([
    { id: 1, productName: 'เครื่องดื่ม' },
    { id: 2, productName: 'อาหารแห้ง' },
    { id: 3, productName: 'เครื่องใช้ไฟฟ้า' },
    { id: 4, productName: 'ของใช้ในครัวเรือน' },
    { id: 5, productName: 'เครื่องเขียน' }
  ]);

  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required]
    });
  }

  openMyDialog(element?: ProductType) {
    if (element) {
      this.isEdit = true;
      this.currentEditId = element.id;
      this.productForm.patchValue({
        productName: element.productName
      });
    } else {
      this.isEdit = false;
      this.currentEditId = null;
      this.productForm.reset();
    }

    this.dialog.open(this.myDialogTemplate, {
      width: '500px',
      disableClose: true
    });
  }

  save() {
    if (this.productForm.valid) {
      const { productName } = this.productForm.value;
      const currentData = this.dataSource.data;

      if (this.isEdit && this.currentEditId !== null) {
        this.dataSource.data = currentData.map(item =>
          item.id === this.currentEditId ? { ...item, productName } : item
        );
      } else {
        const newId = currentData.length > 0 ? Math.max(...currentData.map(d => d.id)) + 1 : 1;
        const newRow: ProductType = { id: newId, productName };
        this.dataSource.data = [...currentData, newRow];
      }

      this.onCancel();
    }
  }


  onCancel() {
    this.productForm.reset();
    this.dialog.closeAll();
  }

  deleteType(id: number) {
    if (confirm('ยืนยันการลบ?')) {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
