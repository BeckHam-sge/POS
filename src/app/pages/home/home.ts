// home.ts
import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HomeformComponent } from './homeform/homeform';

export interface home {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name'];

  datasource = new MatTableDataSource<home>([
    { id: 1, name: 'สมหมาย' }
  ]);

  openSimpleDialog() {
    const dialogRef = this.dialog.open(HomeformComponent, {
      width: '400px'
    });

    // รับข้อมูลจาก dialog เมื่อปิด
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewUser(result);
      }
    });
  }

  addNewUser(user: home) {
    const currentData = this.datasource.data;
    this.datasource.data = [...currentData, user];
  }
}
