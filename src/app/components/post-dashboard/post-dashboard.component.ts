import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IPost } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';
import { PostFormComponent } from './post-form/post-form.component';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
posts: IPost[]=[]
  constructor(
    private _postservice:PostService,
    private _matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getPosts()
    this.updateposts();
  }

  updateposts(){
    this._postservice.UpdateSub$.subscribe({
      next:data=>{
        if(data){
          this.getPosts()
        }
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
        this.posts.unshift(data);
      } 
    },
    error: err => {
      console.log(err);
    }
  });
}

onPostRemoved(id: string) {
  this.posts = this.posts.filter(
    post => post.id.toString() !== id
  );
}

}
