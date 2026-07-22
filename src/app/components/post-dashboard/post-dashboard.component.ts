import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IPost } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';
import { PostFormComponent } from './post-form/post-form.component';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
posts: IPost[]=[]
  constructor(
    private _postservice:PostService,
    private _matDialog:MatDialog,
    private _spinner:SpinnerService
  ) { }

  ngOnInit(): void {
    this.getPosts()
    this.updateposts();
  }

  updateposts(){
    this._postservice.UpdateSub$.subscribe({
      next:data=>{
        this._postservice.isineditmode$.subscribe(res => {
          if(res){
            let index = this.posts.findIndex(ele => ele.userId === data.userId);
            this.posts[index] = data;
              this._spinner.emitLoadingFlag(false)
            return;
          }else{
            this.posts.unshift(data)
              this._spinner.emitLoadingFlag(false)
          }
        })

        
      }
    })
  }

  getPosts(){
    this._postservice.fetchBlog().subscribe({
      next:data=>{
        this.posts=data
        console.log(data);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

openPostForm() {
  let matconfig = new MatDialogConfig();
  matconfig.width = '450px';
  matconfig.disableClose = true;
  let matDilaogRef = this._matDialog.open(
    PostFormComponent,
    matconfig
  );

  matDilaogRef.afterClosed().subscribe({
    next: data => {
      if (data) {
        console.log(data)
      } 
    },
    error: err => {
      console.log(err);
    }
  });
}

onPostRemoved(id: string) {
  this.posts = this.posts.filter(
    post => post.userId.toString() !== id
  );
}

}
