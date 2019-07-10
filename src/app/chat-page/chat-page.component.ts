import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Observable } from 'rxjs';
import { MyComment } from '../interfaces/my-comment';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  comments$: Observable<MyComment[]> = this.commentService.getComments();

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

}
