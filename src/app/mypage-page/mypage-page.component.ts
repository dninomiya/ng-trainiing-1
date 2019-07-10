import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Observable } from 'rxjs';
import { MyComment } from '../interfaces/my-comment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mypage-page',
  templateUrl: './mypage-page.component.html',
  styleUrls: ['./mypage-page.component.scss']
})
export class MypagePageComponent implements OnInit {

  myComments$: Observable<MyComment[]>;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.myComments$ = this.commentService.getMyComments(
      this.authService.user.uid
    );
  }

}
