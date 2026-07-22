import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/post';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL:string = environment.base_url;
  POST_URL = `${this.BASE_URL}`;
  UpdateSub$: Subject<IPost> = new Subject<IPost>();
  isineditmode$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _http: HttpClient,
    private _spinner: SpinnerService
  ) {}

 fetchBlog(): Observable<any> {

  console.log('1. API START - spinner true');
  this._spinner.emitLoadingFlag(true);

  return this._http.get<any>(this.POST_URL).pipe(
    map(res => res.data),

    finalize(() => {
      console.log('2. API FINISHED - spinner false');
      this._spinner.emitLoadingFlag(false);
    })
  );
}

  addPost(postData: IPost): Observable<any> {

    this._spinner.emitLoadingFlag(true);

    return this._http.post<any>(this.POST_URL, postData).pipe(
      finalize(() => {
        this._spinner.emitLoadingFlag(false);
      })
    );
  }

  updatePost(postData: IPost): Observable<any> {

    this._spinner.emitLoadingFlag(true);

    let updatePostUrl = `${this.POST_URL}/${postData.userId}`;

    return this._http.patch<any>(updatePostUrl, postData).pipe(
      finalize(() => {
        this._spinner.emitLoadingFlag(false);
      })
    );
  }

  removePost(postId: string): Observable<any> {

    this._spinner.emitLoadingFlag(true);

    let removePostUrl = `${this.POST_URL}/${postId}`;

    return this._http.delete<any>(removePostUrl).pipe(
      finalize(() => {
        this._spinner.emitLoadingFlag(false);
      })
    );
  }
}