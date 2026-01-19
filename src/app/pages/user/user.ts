
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Form } from './form/form';
import { Users } from '../../services/Users/users';


export interface UserData {
    id: number;
    username: string;
    name: string;
    role: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    MatInputModule,
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserComponent implements OnInit {

  @ViewChild('deleteDialog') deleteDialogTemplate!: TemplateRef<any>;

  private dialog = inject(MatDialog);
  private usersService = inject(Users);

  displayedColumns: string[] = ['id','username','name','role','actions'];
  dataSource = new MatTableDataSource<UserData>([]);
  pendingDeleteId: number | null | undefined;

  ngOnInit(): void {
    this.loadUsers();
  }

  handleSave(result: UserData) {
    this.usersService.addUser(result).subscribe({
      next: () => {
        this.loadUsers();
      }
    })
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (response: any) => {
        console.log('apiusers', response);
        this.dataSource.data = response;
      }
    })
  }

  onAddUser () {
    const dialogRef = this.dialog.open(Form, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleSave(result);
      }
    });
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  editUser() {
  }

  deleteUser(id: number) {
    this.pendingDeleteId = id;
    this.dialog.open(this.deleteDialogTemplate, {
      width: '400px'
    })
  }

  confirmDelete() {
    if (this.pendingDeleteId) {
      this.usersService.deleteUser(this.pendingDeleteId).subscribe({
        next: () => {
          this.loadUsers();
          this.dialog.closeAll();
          this.pendingDeleteId = null;
        }
      });
    }
  }
}
