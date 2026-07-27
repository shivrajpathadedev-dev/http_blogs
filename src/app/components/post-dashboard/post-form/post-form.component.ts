import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { IPost } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postform!: FormGroup;
  isInEditmode: boolean = false;
  post!: IPost;
  constructor(
    private _matdilogRef: MatDialogRef<PostFormComponent>,
   @Inject(MAT_DIALOG_DATA) public data: IPost,
    private _postservice: PostService,
    private _snackbar: SnackbarService,
    private _spinner:SpinnerService
  ) { }

ngOnInit(): void {
  this.createPost();

  if (this.data) {
    this.isInEditmode = true;
    this.post = this.data;

    this.postform.patchValue({
      title: this.data.title,
      author: this.data.author,
      body: this.data.body
    });
  }
}

  createPost() {
    this.postform = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required])
    });
  }

onPostSubmit() {

  if (this.postform.invalid) {
    this.postform.markAllAsTouched();
    return;
  }

  let postData: IPost = this.postform.value;

  this._postservice.addPost(postData)
    .subscribe({
      next: data => {

        this.postform.reset();

        // MongoDB response मध्ये _id आहे
        this._postservice.UpdateSub$.next(data.data);

        this._postservice.isineditmode$.next(false);

        this._matdilogRef.close(data.data);

        this._snackbar.openSnackBar(
          data.message,
          'Close'
        );
      },

      error: err => {
        console.log(err);
      }
    });
}

onUpdatePost() {

  if (this.postform.invalid) {
    this.postform.markAllAsTouched();
    return;
  }

  let postData: IPost = this.postform.value;

  this._postservice.updatePost({
    ...postData,
    _id: this.post._id
  })
  .subscribe({
    next: data => {

      console.log(data);

      this.postform.reset();

      // MongoDB updated data dashboard ला send
      this._postservice.UpdateSub$.next(data.data);

      this._postservice.isineditmode$.next(true);

      // Dialog close
      this._matdilogRef.close(data.data);

      this._snackbar.openSnackBar(
        data.message,
        'Close'
      );
    },

    error: err => {
      console.log(err);
    }
  });
}

  onCancel() {
    this._matdilogRef.close(false);
    }
}