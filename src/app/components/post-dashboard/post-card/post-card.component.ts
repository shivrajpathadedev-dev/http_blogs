import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostService } from 'src/app/service/post.service';
import { IPost } from 'src/app/models/post';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

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
    matConfig.data = this.post
    this._matDialog.open(PostFormComponent, matConfig);
  }

  onRemovePost() {
    let matconfig = new MatDialogConfig()
    matconfig.width = '450px';
    matconfig.disableClose = true;
    matconfig.data = `Are You sure do you want to remove This Blog!!`
    let matDialog = this._matDialog.open(GetConfirmComponent, matconfig)
    matDialog.afterClosed()
      .subscribe(res => {
        if (res) {
          this._postService.removePost(this.post.userId)
            .subscribe({
              next: data => {
                this.postRemoved.emit(this.post.userId);
                this._snackbar.openSnackBar('Post deleted successfully', 'Close');
              },
              error: err => {
                console.log(err);
              }
            });
        }
      })
     }
}
