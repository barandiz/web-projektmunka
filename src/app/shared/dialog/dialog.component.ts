import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  //Adatok beinjektálása
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }


  
}
