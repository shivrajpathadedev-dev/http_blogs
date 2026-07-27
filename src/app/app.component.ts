import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  islOading:boolean=false
  title = 'http_blogs';
  private _spinnerservice=inject(SpinnerService)
  private _cdr=inject(ChangeDetectorRef)
  ngOnInit(): void {
    this._spinnerservice.isLoadingObj$.subscribe(res=>{
      this.islOading=res;
      this._cdr.detectChanges()
    })
  }
}