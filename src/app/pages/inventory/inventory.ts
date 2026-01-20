import { Component, ViewChild, TemplateRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product, ProductService } from '../../services/productservice/product';
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

  private productService = inject(ProductService) as ProductService;
  private dialog = inject(MatDialog);

  pendingDeleteId: string | null = null;
  mode: 'add' | 'edit' = 'add';
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
            id: item.id || item.id,
            code: item.code || item.sku || item.product_code ||  'N/A',
            productName: item.name || item.productName || 'Unknown Product',
            price: parseFloat(item.price) || 0,
            stock: Number(item.amount || item.stock || 0),
          }));

          console.log('Mapped Data Source:', this.dataSource.data);
        },
        error: (err) => console.error('Error loading data', err)
      });
  }

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

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue;
    }

  openMyDialog() {
    this.mode = 'add';
    const dialogRef = this.dialog.open(inventoryformComponent, {
        width: '500px',
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
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleSave(result);
      }
    });
  }

  handleSave(formData: any) {
    const { id, productName, price, stock, categoryId } = formData;
    const productData: any = {
      name: productName,
      price: Number(price),
      amount: Number(stock),
      category_id: categoryId
    };

    if (id) {
      this.productService.updateProduct(id, productData).subscribe({
        next: () => {
          alert('อัปเดตสินค้าเรียบร้อย');
          this.loadData();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.productService.addProduct(productData).subscribe({
        next: () => {
          alert('บันทึกสินค้าเรียบร้อย');
          this.loadData();
        },
        error: (err) => console.error(err)
      });
    }
  }


  closeMyDialog() {
    this.dialog.closeAll();
  }
}
