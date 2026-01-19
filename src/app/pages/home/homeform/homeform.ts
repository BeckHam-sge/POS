import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Form } from '../../user/form/form';

export interface user {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dialog-idname',
  standalone: true,
  templateUrl: './homeform.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    Form
  ]
})
export class HomeformComponent {
  private dialogRef = inject(MatDialogRef<HomeformComponent>);
  private fb = inject(FormBuilder);

  userForm!: FormGroup;

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(){
    this.userForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  save() {
    if (this.userForm.valid) {
      const { id, name } = this.userForm.getRawValue();
      const userData: user = {
        id,
        name
      };

      this.dialogRef.close(userData);

    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
