import { Component, OnInit, Input } from '@angular/core';
import { MyComment } from '../interfaces/my-comment';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-edit-form',
  templateUrl: './comment-edit-form.component.html',
  styleUrls: ['./comment-edit-form.component.scss']
})
export class CommentEditFormComponent implements OnInit {
  @Input() comment: MyComment;

  form = this.fb.group({
    body: ['', [Validators.required, Validators.maxLength(400)]]
  });

  get body() {
    return this.form.get('body');
  }

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form.patchValue(this.comment);
  }

  submit() {
    if (this.form.valid) {
      this.commentService
        .editComment(this.comment.id, this.form.value.body)
        .then(() => {
          this.snackBar.open('編集が完了しました', null, {
            duration: 2000
          });
        })
        .catch(() => {
          this.snackBar.open('編集に失敗しました', null, {
            duration: 2000
          });
        });
    }
  }

}
