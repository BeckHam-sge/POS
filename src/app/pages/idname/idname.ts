  import { MatTableModule } from "@angular/material/table";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {  MatDialogModule } from '@angular/material/dialog';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogidnameComponent } from './Dialogidname/Dialogidname';

export interface IdnameData {
  id: string;
  name: string;
  apg: number;
}

@Component({
  selector: 'app-idname',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatAnchor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,


],
  templateUrl: './idname.html',
  styleUrl: './idname.scss',
})
export class Idname {

  displayedColumns: string[] = ['id', 'name', 'apg' , 'action'];

  dataSource: IdnameData[] = [
    { id: 'p001', name: 'สมหมาย', apg: 100 },
    { id: 'p002', name: 'สมศรี', apg: 200 },
    { id: 'p003', name: 'สมปอง', apg: 300 }
  ];

  userForm = new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    apg: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    })
  });

  @ViewChild('myDialogTemplate', { static: true }) myDialogTemplate!: TemplateRef<any>;
  @ViewChild('simpleDialog', { static: true }) simpleDialogTemplate!: TemplateRef<any>;

  constructor(
    public dialog: MatDialog

  ) { }




  ngOnInit(): void {
  }

  deleteItem(id : string) {
    this.dataSource = this.dataSource.filter(item => item.id !== id);
  }


  openMyDialog() {
    this.userForm.reset();

    const dialogRef = this.dialog.open(this.myDialogTemplate, {
      width: '500px',
      disableClose: true // ป้องกันการคลิกนอก dialog เพื่อปิด
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.addUser();
      }
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser: IdnameData = {
        id: this.userForm.value.id || '',
        name: this.userForm.value.name || '',
        apg: this.userForm.value.apg || 0
      };


      this.dataSource = [...this.dataSource, newUser];
      this.userForm.reset();
    }
  }

  openSimpleDialog() {
  this.dialog.open(DialogidnameComponent, {
      width: '400px'
    });

  }




  saveUser() {
    if (this.userForm.valid) {
      const newUser: IdnameData = this.userForm.getRawValue(); // ดึงค่าทั้งหมดจาก Form

      // อัปเดต DataSource (ต้องกระจาย array ใหม่เพื่อให้ Table ตรวจพบการเปลี่ยนแปลง)
      this.dataSource = [...this.dataSource, newUser];

      this.dialog.closeAll(); // ปิด Dialog
      this.userForm.reset({ apg: 0 }); // รีเซ็ตค่าเริ่มต้น
    }
  }

  cancel() {
    this.dialog.closeAll();
  }

}
