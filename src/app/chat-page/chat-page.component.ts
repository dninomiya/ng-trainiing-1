import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Observable } from 'rxjs';
import { MyComment } from '../interfaces/my-comment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  comments$: Observable<MyComment[]> = this.commentService.getComments()
    .pipe(tap(items => this.isLoading = !items));
  isLoading = true;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

}
