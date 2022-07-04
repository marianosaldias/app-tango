import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from 'src/app/services/utils.service';

import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  // subscriptionParam: Subscription;
  // subscriptionProfiles: Subscription;

  inputFilter: string = '';

  tag: string = null;
  state: string = null;

  currentPage: number;
  p: number = 1;
  autoHidePaginator: boolean = false;
  totalBlogs: number;
  weHaveResults: boolean;

  constructor(
    private blogService: BlogService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.state = this.utils.getState();
    this.route.paramMap.subscribe(params => {
      this.tag = params.get("tag");
      // this.tag = this.utils.capitalizeFirstLetter(this.tag.toLowerCase());
      if (this.tag) {
          this.getBlogsByTag(this.tag);
      } else {
          this.getAllBlogs();
      }
    });
  }

  getAllBlogs() {
    this.weHaveResults = false;
    this.blogService.getAllBlogs()
      .subscribe(res => {
        //this.blogService.blogss = res as Blog[];
        this.blogService.blogs = <Blog[]>res;
        this.totalBlogs = this.blogService.blogs.length;
        this.p = 1;
        console.log(this.blogService.blogs);
        this.weHaveResults = true;
      });
  }

  getBlogsByTag(tag: string) {
    this.weHaveResults = false;
    this.tag = tag;
    this.blogService.getBlogsByTag(this.tag)
      .subscribe(res => {
        //this.blogService.blogss = res as Blog[];
        this.blogService.blogs = <Blog[]>res;
        this.totalBlogs = this.blogService.blogs.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }

  getBlogsByState() {
    this.weHaveResults = false;
    this.blogService.blogs = [];
    this.blogService.getBlogsByState(this.state)
      .subscribe(res => {
        //this.blogService.blogs = res as Blog[];
        this.blogService.blogs = <Blog[]>res;
        this.totalBlogs = this.blogService.blogs.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }  

  getBlogsByTagAndState() {
    this.weHaveResults = false;
    this.blogService.blogs = [];
    this.blogService.getBlogsByTagAndState(this.tag, this.state)
      .subscribe(res => {
        //this.blogService.blogs = res as Blog[];
        this.blogService.blogs = <Blog[]>res;
        this.totalBlogs = this.blogService.blogs.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }  

  // TAGS
  // str = str.split(",");
  // convierte el str (separados por ',') en un array de strings

  modelFilterChange(inputText: string) {
    this.p = 1;
    this.inputFilter = inputText;
    if(inputText == '') {
      this.autoHidePaginator = true;
    } else {
      this.autoHidePaginator = false;
    }
  }  

  // ngOnDestroy() {
  //   this.subscriptionParam.unsubscribe();
  //   this.subscriptionProfiles.unsubscribe();
  //   this.p = 1;
  // }  

}
