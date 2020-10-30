import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-initial-dialog',
  templateUrl: './initial-dialog.component.html',
  styleUrls: ['./initial-dialog.component.css']
})
export class InitialDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<InitialDialogComponent>) { }

  ngOnInit() {  }

  onClose() {
    this.dialogRef.close();
  }

}
