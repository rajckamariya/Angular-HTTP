import { HttpClient, HttpEventType, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map , tap } from "rxjs/operators";

import { Post } from './post.model';

@Injectable({
    providedIn:'root'
})
export class PostsService{

    error = new Subject <string>();
    constructor(private http:HttpClient){}

    createAndStorePost(title:string,content:string){
        const postData:Post={title:title,content:content};
        this.http.post<{name:string}>('https://httpangular-7c79a-default-rtdb.firebaseio.com/posts.json',postData,{observe : 'response'}).subscribe(responseData=>{
        console.log(responseData);
    },error=>{
        this.error.next(error.message);
    });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        return this.http.get<{[key:string]:Post}>('https://httpangular-7c79a-default-rtdb.firebaseio.com/posts.json',{params:searchParams})
        .pipe(
        map((responseData:any)=>{
        const postsArray:Post[] =[];
        // console.log(responseData?.content)
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id:key});
          }
        }
        return postsArray;
      }),catchError(errorRes=>{
          return throwError(errorRes);
      }));
  }

  deletePosts(){
      return this.http.delete('https://httpangular-7c79a-default-rtdb.firebaseio.com/posts.json',{
          observe:'events'
      })
        .pipe(
            tap((event)=>{
                if(event.type === HttpEventType.Sent)
                {
                    console.log('It is Sent');
                }
                if(event.type === HttpEventType.Response)
                {
                    console.log('Response Get');
                }
            })
      );
  }
    
}