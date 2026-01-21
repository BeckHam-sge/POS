import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Form } from './form/form';
import { Users } from '../../services/Users-service/users-service';

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
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('deleteDialog') deleteDialogTemplate!: TemplateRef<any>;

  private dialog = inject(MatDialog);
  private usersService = inject(Users);

  displayedColumns: string[] = ['id','username','name','role','actions'];
  dataSource = new MatTableDataSource<UserData>([]);
  pendingDeleteId: number | null | undefined;
  mode: string | undefined;
  value: string | undefined;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (response: any) => {
        console.log('apiusers', response);
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  onAddUser() {
    const dialogRef = this.dialog.open(Form, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Save(result);
      }
    });
  }

  Save(result: any) {
    const { id, username, name, role, password } = result;
    const userData: any = {
      username: username,
      name: name,
      password: String(password),
      role: role,
    };

    if (id) {
      this.usersService.updateUser(id, userData).subscribe({
        next: () => {
          alert('อัปเดตข้อมูลเรียบร้อย');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      this.usersService.addUser(userData).subscribe({
        next: () => {
          alert('บันทึกข้อมูลเรียบร้อย');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    }
  }

  search(value: string) {
    this.usersService.searchUsers(value).subscribe({
    next: (res) => this.dataSource.data = res,
    })
  }

  editUser(element: UserData) {
    const dialogRef = this.dialog.open(Form, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Save(result);
      }
    });
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
