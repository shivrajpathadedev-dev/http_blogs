import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
private islOading$:BehaviorSubject<boolean>=new BehaviorSubject(false)
isLoadingObj$=this.islOading$.asObservable()
  constructor() { }
  emitLoadingFlag(flag:boolean){
    this.islOading$.next(flag) //as a observer 
  }
}
