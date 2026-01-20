import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatOption } from "@angular/material/select";
import { Users, Role } from '../../../services/Usersservice/users';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelect,
    MatOption
],
  templateUrl: './form.html',
})
export class Form {
  private dialogRef = inject(MatDialogRef<Form>);
  private fb = inject(FormBuilder);

  userForm!: FormGroup;
  roles: Role[] = [];
  Roles$!: Observable<any[]> ;
  Roles: any ;
  data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.initUserForm();
    this.editUser();
  }

  editUser() {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  initUserForm () {
    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required , Validators.minLength(6)]],
      name: ['', Validators.required],
      role: ['', Validators.required],
    })
  }

  save() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}


