import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from "@angular/material/select";

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
    MatOption
],
  templateUrl: './form.html',
})
export class Form {
  [x: string]: any;
  private dialogRef = inject(MatDialogRef<Form>);
  private fb = inject(FormBuilder);

  userForm!: FormGroup;

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm () {
    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required , Validators.minLength(8)],
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


