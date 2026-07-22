import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {
getmsg!:string
  constructor(
    private _matdilog:MatDialogRef<GetConfirmComponent>,
@Inject(MAT_DIALOG_DATA) msg:string
  ) { }

  ngOnInit(): void {
  }
  
onclick(flag:boolean){
this._matdilog.close(flag)
}
}
