import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/post';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  BASE_URL = environment.base_url
  POST_URL = `${this.BASE_URL}`
  UpdateSub$ : Subject<boolean> = new Subject<boolean>();
  constructor(
    private _http: HttpClient
  ) { }

  fetchBlog(): Observable<any> {
    return this._http.get<any>(this.POST_URL)
      .pipe(
        map(res => res.data)
      )
  }

  addPost(postData: IPost): Observable<any> {
    return this._http.post<any>(this.POST_URL, postData);
  }

  updatePost(postData: IPost):Observable<any> {
    let UpdatePostUrl=`${this.POST_URL}/${postData.id}`;
    return this._http.patch<any>(UpdatePostUrl, postData);
  }

  removePost(postId: string): Observable<any> {
    let removePostUrl = `${this.POST_URL}/${postId}`;
    return this._http.delete<any>(removePostUrl);
  }
}
