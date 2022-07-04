import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

    editorConfigIntroParagraph: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '100px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      // fonts: [
      //   {class: 'arial', name: 'Arial'},
      //   {class: 'times-new-roman', name: 'Times New Roman'},
      //   {class: 'calibri', name: 'Calibri'},
      //   {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      // ],
      // customClasses: [
      //   {
      //     name: 'quote',
      //     class: 'quote',
      //   },
      //   {
      //     name: 'redText',
      //     class: 'redText'
      //   },
      //   {
      //     name: 'titleText',
      //     class: 'titleText',
      //     tag: 'h1',
      //   },
      // ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        //['bold', 'italic'],
        //['fontSize', 'insertImage', 'textColor', 'backgroundColor', 'customClasses', 'fontName', 'link',
        //'unlink', 'undo', 'redo', 'toggleEditorMode', 'heading']
        ['undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName',
        'fontSize', 'insertImage', 'textColor', 'backgroundColor', 'customClasses', 'fontName', 'link',
        'unlink', 'undo', 'redo', 'toggleEditorMode', 'heading',
        'insertVideo',
        'insertHorizontalRule',]
      ]
    };    

    editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '300px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        //['bold', 'italic'],
        ['fontSize', 'insertImage', 'textColor', 'backgroundColor', 'customClasses', 'fontName', 'link',
        'unlink', 'undo', 'redo', 'toggleEditorMode', 'heading']
      ]
    };

    userId = sessionStorage.getItem('USER_ID');
    blogForm: FormGroup;
    submitted = false;
    show: boolean = false;
    weHaveResults: boolean;
    registersLenght: number;

    constructor(
      private formBuilder: FormBuilder, 
      private blogService: BlogService
    ) { }

    ngOnInit() {
        this.blogForm = this.formBuilder.group({
            _id               : [''],
            idUser            : [''],
            state             : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            city              : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            title             : ['', Validators.required],
            introParagraph    : ['', Validators.required],
            paragraphs        : ['', Validators.required],
            date              : ['', Validators.required],
            lan               : ['', Validators.required],
            writer            : ['', [Validators.required, Validators.minLength(2)]],
            email             : ['', [Validators.required, Validators.email]],
            tags              : ['', Validators.required]
        });

        this.getBlogsWithIdUser();
    }

    // convenience getter for easy access to form fields
    get f() { return this.blogForm.controls; }

    // getProfiles() {
    //   this.profileService.getProfiles()
    //     .subscribe(res => {
    //       //this.profileService.profiles = res as Profile[];
    //       this.profileService.profiles = <Profile[]>res
    //     });
    // }

    getBlogsWithIdUser() {
      this.weHaveResults = false;
      // const userId = localStorage.getItem('userId');
      this.blogService.getBlogsWithIdUser()
        .subscribe(res => {
          //this.blogService.blogs = res as Blog[];
          this.blogService.blogs = <Blog[]>res;
          this.weHaveResults = true;
          this.registersLenght = this.blogService.blogs.length; 
        });
    }

    editBlog(blog: Blog) {
      this.show = true;
      this.blogService.selectedBlog = blog;

      this.blogForm.get('_id').setValue(blog._id);
      this.blogForm.get('idUser').setValue(this.userId);
      this.blogForm.get('state').setValue(blog.state);
      this.blogForm.get('city').setValue(blog.city);
      this.blogForm.get('title').setValue(blog.title);
      this.blogForm.get('introParagraph').setValue(blog.introParagraph);
      this.blogForm.get('paragraphs').setValue(blog.paragraphs);
      this.blogForm.get('date').setValue(blog.date);
      this.blogForm.get('lan').setValue(blog.lan);
      this.blogForm.get('writer').setValue(blog.writer);
      this.blogForm.get('email').setValue(blog.email);
      this.blogForm.get('tags').setValue(blog.tags);

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.blogForm.value, null, 4));
    }

    deleteBlog(_id: string) {
      this.blogService.deleteBlog(_id)
        .subscribe(res => {
          this.getBlogsWithIdUser();
          this.onReset();
        })
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.f);

        if (this.blogForm.invalid) {
            return;
        };

        let newBlog = new Blog (
          this.blogForm.value._id,
          this.blogForm.value.idUser,
          this.blogForm.value.state,
          this.blogForm.value.city,
          this.blogForm.value.title,
          this.blogForm.value.introParagraph,
          this.blogForm.value.paragraphs,
          this.blogForm.value.date,
          this.blogForm.value.lan,
          this.blogForm.value.writer,
          this.blogForm.value.email,
          this.blogForm.value.tags
        );
        console.log(newBlog);

        if(newBlog._id) {
          this.blogService.putBlog(newBlog)
            .subscribe(res => {
              this.onReset();
              this.getBlogsWithIdUser();
            });
        } else {
          this.blogService.postBlog(newBlog)
          .subscribe(res => {
            this.onReset();
            this.getBlogsWithIdUser();
          });
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.blogForm.value, null, 4));
    }

    toggle() {
      this.show = !this.show;
    }       

    // onReset(form?: FormGroup) {
    //   if (form) {
    //     this.submitted = false;
    //     form.reset();
    //     this.blogService.selectedBlog = new Blog();
    //   }
    // }    

    onReset() {
      this.submitted = false;
      this.blogForm.reset();
      this.blogService.selectedBlog = new Blog();
    }    

}

