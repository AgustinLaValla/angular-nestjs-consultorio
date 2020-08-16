import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-initial-dialog',
  templateUrl: './initial-dialog.component.html',
  styles: []
})
export class InitialDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<InitialDialogComponent>) { }

  ngOnInit() {  }

  onClose() {
    this.dialogRef.close();
  }

}
