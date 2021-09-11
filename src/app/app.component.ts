import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'http01';
  loadedPosts:Post[]=[];
  isFetching=false;
  private errorSub:any ;
  error:any = null;
  

  constructor(private http:HttpClient,private postsService:PostsService){}
  
  ngOnInit(){
    this.errorSub = this.postsService.error.subscribe(errorMessage=>{
      this.error = errorMessage;
    })
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    },error=>{
      this.isFetching = false;
      this.error = error.message ;
      console.log(error);
    });
  }
  ngOnDestroy(){
    this.errorSub.unsubscibe();
  }
  onCreatePost(postData: Post){
    this.postsService.createAndStorePost(postData.title,postData.content);
  }
  onFetchPosts(){
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    },error=>{
      this.isFetching = false;
      this.error = error.error.error ;
      console.log(error);
    });
  }
  onErrorHandle(){
    this.error = null;
  }
  onClearPosts(){
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    })
  }
  onSelect(){

  }
}
