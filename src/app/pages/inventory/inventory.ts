import { Component, ViewChild, TemplateRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product, ProductService } from '../../services/product/product';
import { MatPaginatorModule } from "@angular/material/paginator";

import { inventoryformComponent } from './inventoryform/inventoryform';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule
],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory implements OnInit {
  @ViewChild('deleteDialog') deleteDialogTemplate!: TemplateRef<any>;

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  pendingDeleteId: string | null = null;
  mode: 'add' | 'edit' = 'add'; // ระบุโหมดการทำงาน: เพิ่มหรือแก้ไข


  deleteProduct(id: string) {
    this.pendingDeleteId = id;
    this.dialog.open(this.deleteDialogTemplate, {
      width: '350px'
    });
  }

  confirmDelete() {
    if (this.pendingDeleteId) {
      this.productService.deleteProduct(this.pendingDeleteId).subscribe({
        next: () => {
            this.loadData();
            this.dialog.closeAll();
            this.pendingDeleteId = null;
        },
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }

  displayedColumns: string[] = ['code', 'productName', 'Categories', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
      this.productService.getProducts().subscribe({
        next: (response: any) => {
          console.log('API Response Raw:', response);
          
          let data: any[] = [];
          if (Array.isArray(response)) {
            data = response;
          } else if (response && Array.isArray(response.data)) {
            data = response.data;
          } else if (response && Array.isArray(response.sku_masters)) {
            data = response.sku_masters;
          }

          if (data.length === 0) {
              console.warn('API returned an empty array of products.');
          }


          this.dataSource.data = data.map(item => ({
            _id: item._id || item.id, // Use id if _id missing
            code: item.code || item.sku || item.product_code || String(item.id) || 'N/A',
            productName: item.name || item.productName || 'Unknown Product',
            price: parseFloat(item.price) || 0,
            stock: Number(item.amount || item.stock || 0),
          }));
          
          console.log('Mapped Data Source:', this.dataSource.data);
        },
        error: (err) => console.error('Error loading data', err)
      });
  }


    applyFilter(event: Event) {
      console.log("event",event.target as HTMLInputElement)
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue;
    }



  // ฟังก์ชัน save เดิมถูกย้ายไปจัดการผ่าน onAdd/editProduct แล้ว (หลังจากปิด dialog)
  
  onAddProduct() {
    this.mode = 'add'; 
    const dialogRef = this.dialog.open(inventoryformComponent, {
        width: '500px',
        // ไม่ต้องส่ง data สำหรับการเพิ่มใหม่
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.handleSave(result);
        }
      });
  }

  editProduct(product: Product) {
    this.mode = 'edit';
    const dialogRef = this.dialog.open(inventoryformComponent, {
      width: '500px',
      data: product // ส่งข้อมูลสินค้าไปให้ฟอร์ม
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleSave(result);
      }
    });
  }

  // ฟังก์ชันสำหรับจัดการข้อมูลที่ได้จาก Dialog (ทั้ง Add และ Edit)
  handleSave(formData: any) {
    const { id, productName, price, stock, categoryId } = formData;
    
    const productData: any = {
      name: productName,
      price: Number(price),
      amount: Number(stock),
      category_id: categoryId // ใช้ categoryId ที่ได้จากฟอร์ม
    };

    if (id) {
       // Update
       this.productService.updateProduct(id, productData).subscribe({
        next: () => {
          alert('อัปเดตสินค้าเรียบร้อย');
          this.loadData();
        },
        error: (err) => console.error(err)
      });
    } else {
      // Add
      this.productService.addProduct(productData).subscribe({
        next: () => {
           alert('บันทึกสินค้าเรียบร้อย');
           this.loadData();
        },
        error: (err) => console.error(err)
      });
    }
  }

  openMyDialog() {
    this.onAddProduct();
  }

  closeMyDialog() {
    this.dialog.closeAll();
  }
}
