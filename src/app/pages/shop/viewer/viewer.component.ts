import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Comment} from "../../../shared/models/Comment";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Image } from '../../../shared/models/Image';
import {ShopService} from "../../../shared/services/shop.service";
import {UserService} from "../../../shared/services/user.service";
import {CommentService} from "../../../shared/services/comment.service";
import { User } from '../../../shared/models/User';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {
  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;


  comments: Array<Comment> = [];
  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  });
  constructor(private fb: FormBuilder, private router: Router,private shopService: ShopService,private userService: UserService,private commentService: CommentService) { }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }
  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.shopService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;      
      })
      this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      })
    }
  }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username);
    }, error => {
      console.error(error);
    });
  }
  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());

        this.commentService.create(this.commentsForm.value).then(_ => {
          this.router.navigateByUrl('/shop/successful/' + this.commentsForm.get('username')?.value);
        }).catch(error => {
          console.error(error);
        });      }
    }
  }

}
