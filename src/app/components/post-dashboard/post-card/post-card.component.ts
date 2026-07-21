import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostService } from 'src/app/service/post.service';
import { IPost } from 'src/app/models/post';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post!: IPost;
  @Output() postRemoved = new EventEmitter<string>();
  constructor(
    private _matDialog: MatDialog,
    private _postService: PostService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onEditPost() {
    let matConfig = new MatDialogConfig();

    matConfig.width = '450px';
    matConfig.disableClose = true;

    matConfig.data = {
      post: this.post
    };

    this._matDialog.open(PostFormComponent, matConfig);
  }

  onRemovePost() {
    this._postService
      .removePost(this.post.id.toString())
      .subscribe({
        next: data => {
          this.postRemoved.emit(this.post.id.toString());
          this._snackbar.openSnackBar('Post deleted successfully', 'Close');
        },
        error: err => {
          console.log(err);
        }
      });
  }
}