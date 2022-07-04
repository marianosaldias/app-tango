import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BlogService } from 'src/app/services/blog.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  id: string;
  resBlog: Blog;
  weHaveResults: boolean;

  constructor(
    private blogService: BlogService,
    private utils: UtilsService,
    private location: Location,
    private route: ActivatedRoute       
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      // this.profileType = this.utils.capitalizeFirstLetter(this.profileType.toLowerCase());
    });
    this.getBlogById();    
  }

  getBlogById() {
    this.weHaveResults = false;
    this.blogService.getBlogById(this.id)
      .subscribe(res => {
        // this.resBlog = res as Blog;
        this.resBlog = <Blog>res;
        console.log(this.resBlog);
        this.weHaveResults = true;
      });
  }   
  
  goBack() {
    this.location.back();
  }

}
