import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  selectedBlog: Blog;
  blogs: Blog[];
  type: string;

  readonly URL_API = 'http://localhost:3000/api/blogs/';

  constructor(private http: HttpClient) { 
    this.selectedBlog = new Blog();
  }

  getAllBlogs() {
    return this.http.get(this.URL_API + 'all/');
  }

  getBlogsWithIdUser() {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API);
  }  

  postBlog(blog: Blog) {
    console.log(blog);
    return this.http.post(this.URL_API, blog);
  }  

  getBlogById(id: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + 'id/' + `${id}`);
  }  

  getBlogsByTag(tag: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + 'tag/' + `${tag}`);
  } 
  
  getBlogsByLan(lan: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + 'lan/' + `${lan}`);
  }   

  getBlogsByState(state: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + 'state/' + `${state}`);
  }    

  getBlogsByTagAndState(tag: string, state: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + 'tag/' + `${tag}` + '/state/' + `${state}`);
  }     

  putBlog(blog: Blog) {
    console.log(blog);
    //return this.http.put(this.URL_API + `/${blog._id}`, blog);
    return this.http.put(this.URL_API + blog._id, blog);
  }    

  deleteBlog(_id: string) {
    return this.http.delete(this.URL_API + `${_id}`);
  }      

}