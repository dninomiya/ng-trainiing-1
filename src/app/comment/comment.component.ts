import { Component, OnInit, Input } from '@angular/core';
import { MyComment } from '../interfaces/my-comment';
import { CommentService } from '../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: MyComment;

  isEditMode: boolean;
  isOwner: boolean;

  constructor(
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isOwner = this.authService.user.uid === this.comment.authorId;
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .then(() => {
        this.snackBar.open('削除しました', null, {
          duration: 2000
        });
      })
      .catch(() => {
        this.snackBar.open('削除できませんでした', null, {
          duration: 2000
        });
      });
  }

  openCommentForm() {
    this.isEditMode = true;
  }

}
